from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Profile
from .serializers import PublicProfileSerializer


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def profile_detail_api_view(request, username, *args, **kwargs):
    current_user = request.user
    profile_obj = Profile.objects.filter(user__username=username).first()
    if profile_obj is None:
        return Response({}, status=404)
    if current_user.profile != profile_obj:
        data = request.data or {}
        action = data.get('action')
        if action == "follow":
            profile_obj.followers.add(current_user)
        elif action == "unfollow":
            profile_obj.followers.remove(current_user)
        else:
            pass
    serializer = PublicProfileSerializer(instance=profile_obj, context={"request": request})
    return Response(serializer.data, status=200)
