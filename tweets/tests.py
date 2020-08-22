from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Tweet

# Create your tests here.

User = get_user_model()


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='caio', password='somepassword')
        self.userb = User.objects.create_user(username='ticio', password='somepassword')
        Tweet.objects.create(content='global tweet #1', user=self.user)
        Tweet.objects.create(content='global tweet #2', user=self.user)
        Tweet.objects.create(content='global tweet #3', user=self.userb)
        self.current_count = Tweet.objects.all().count()

    def test_tweet_created(self):
        tweet_obj = Tweet.objects.create(content='creation test tweet', user=self.user)
        # self.assertEqual(tweet_obj.id, 2)
        self.assertEqual(tweet_obj.content, 'creation test tweet')
        self.assertEqual(tweet_obj.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_action_like(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/", {"id": 1, "action": "like"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get('likes')
        self.assertEqual(like_count, 1)

    def test_action_unlike(self):
        client = self.get_client()
        tweet_obj = Tweet.objects.get(id=2)
        tweet_obj.likes.add(self.user)
        response = client.post("/api/tweets/action/", {"id": 2, "action": "unlike"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get('likes')
        self.assertEqual(like_count, 0)

    def test_action_retweet(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/", {"id": 3, "action": "retweet"})
        self.assertEqual(response.status_code, 201)
        data = response.json()
        new_tweet_id = data.get('id')
        initial_count = self.current_count
        current_count = Tweet.objects.all().count()
        self.assertNotEqual(new_tweet_id, 3)
        self.assertEqual((initial_count + 1), current_count)
        self.assertEqual((initial_count + 1), new_tweet_id)
        # testing if a second retweet crashes
        response = client.post("/api/tweets/action/", {"id": 3, "action": "retweet"})
        data = response.json()
        og_tweet = data.get('original_tweet')
        self.assertEqual(og_tweet['id'], 3)  # the new retweet uses the right original_tweet

    def test_tweet_create_api_view(self):
        data = {"content": "This is a tweet created for test"}
        client = self.get_client()
        response = client.post("/api/tweets/create/", data)
        self.assertEqual(response.status_code, 201)
        response_data = response.json()
        new_tweet_id = response_data.get('id')
        initial_count = self.current_count
        current_count = Tweet.objects.all().count()
        self.assertEqual((initial_count + 1), current_count)
        self.assertEqual((initial_count + 1), new_tweet_id)

    def test_tweet_detail_api_view(self):
        client = self.get_client()
        response = client.get("/api/tweets/1/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        detailed_tweet_id = data.get('id')
        self.assertEqual(detailed_tweet_id, 1)

    def test_tweet_delete_api_view(self):
        client = self.get_client()
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 200)
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code, 404)
        response = client.delete("/api/tweets/3/delete/")
        self.assertEqual(response.status_code, 401)
        response = client.get("/api/tweets/1/")
        self.assertEqual(response.status_code, 404)
