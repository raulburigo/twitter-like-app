from rest_framework import serializers
from tweets.models import Tweet
from profiles.api.serializers import PublicProfileSerializer


class TweetActionSerializer(serializers.Serializer):

    ACTION_OPTIONS = [
        'like',
        'unlike',
        'retweet',
    ]

    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip()
        if value not in self.ACTION_OPTIONS:
            raise serializers.ValidationError("This is not an Action Option")
        return value


class TweetCreateSerializer(serializers.ModelSerializer):

    CONTENT_MAX_LENGTH = 240
    likes = serializers.SerializerMethodField(read_only=True)
    user = PublicProfileSerializer(source='user.profile', read_only=True)

    class Meta:
        model = Tweet
        fields = [
            'user',
            'id',
            'content',
            'likes',
            'timestamp',
        ]

    def get_likes(self, obj):
        return obj.likes.count()

    def get_user(self, obj):
        return obj.user.id

    def validate_content(self, value):
        if len(value) > self.CONTENT_MAX_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value


class TweetSerializer(serializers.ModelSerializer):

    user = PublicProfileSerializer(source='user.profile', read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    original_tweet = TweetCreateSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = [
            'user',
            'id',
            'content',
            'likes',
            'is_retweet',
            'original_tweet',
            'timestamp',
        ]

    def get_likes(self, obj):
        return obj.likes.count()
