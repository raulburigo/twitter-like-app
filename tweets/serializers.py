from rest_framework import serializers
from .models import Tweet


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

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes']

    def get_likes(self, obj):
        return obj.likes.count()

    def validate_content(self, value):
        if len(value) > self.CONTENT_MAX_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value


class TweetSerializer(serializers.ModelSerializer):

    likes = serializers.SerializerMethodField(read_only=True)
    original_tweet = TweetCreateSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes', 'is_retweet', 'original_tweet']

    def get_likes(self, obj):
        return obj.likes.count()
