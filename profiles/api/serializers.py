from rest_framework import serializers
from ..models import Profile


class PublicProfileSerializer(serializers.ModelSerializer):

    followers = serializers.SerializerMethodField(read_only=True)
    following = serializers.SerializerMethodField(read_only=True)
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    is_self = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = [
            'username',
            'id',
            'first_name',
            'last_name',
            'bio',
            'location',
            'followers',
            'following',
            'is_following',
            'is_self',
        ]

    def get_is_following(self, obj):
        request = self.context.get('request')
        if request:
            user = request.user
            return user in obj.followers.all()
        else:
            return None

    def get_is_self(self, obj):
        request = self.context.get('request')
        if request:
            user = request.user
            return (user == obj.user)
        else:
            return None

    def get_followers(self, obj):
        return obj.followers.count()

    def get_following(self, obj):
        return obj.user.following.count()

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    def get_username(self, obj):
        return obj.user.username
