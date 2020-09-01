from django.test import TestCase
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.test import APIClient


# from tweets.models import Tweet


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='caio', password='somepassword')
        self.userb = User.objects.create_user(username='ticio', password='somepassword')
        # Tweet.objects.create(content='global tweet #1', user=self.user)
        # Tweet.objects.create(content='global tweet #2', user=self.user)
        # Tweet.objects.create(content='global tweet #3', user=self.userb)
        # self.current_count = Tweet.objects.all().count()

    def test_profile_created_via_signal(self):
        queryset = Profile.objects.all()
        self.assertEqual(queryset.count(), 2)

    def test_follow(self):
        first = self.user
        second = self.userb
        first.profile.followers.add(second)
        second_user_following_whom = second.following.all()
        queryset = second_user_following_whom.filter(user=first)
        self.assertTrue(queryset.exists())
        first_user_following_no_one = first.following.all()
        self.assertFalse(first_user_following_no_one.exists())
        followers = first.profile.followers.count()
        self.assertEqual(followers, 1)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client

    def test_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(
            f"/api/profiles/{self.userb.username}/follow",
            {"action": "follow"}
        )
        data = response.json()
        followers_count = data.get('count')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(followers_count, 1)

    def test_unfollow_api_endpoint(self):
        client = self.get_client()
        follow_user = self.userb
        follow_user.profile.followers.add(self.user)
        initial_followers = follow_user.profile.followers.count()
        response = client.post(
            f"/api/profiles/{follow_user.username}/follow",
            {"action": "unfollow"}
        )
        data = response.json()
        followers_count = data.get('count')
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(followers_count, initial_followers)
