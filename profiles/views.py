from django.shortcuts import render, get_object_or_404, redirect
from .models import Profile
from .forms import ProfileForm
from django.contrib.auth.decorators import login_required


# Create your views here.


@login_required
def profile_update_view(request, *args, **kwargs):
    user = request.user
    user_data = user._wrapped.__dict__
    my_profile = user.profile
    form = ProfileForm(request.POST or None, instance=my_profile, initial=user_data)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email = form.cleaned_data.get('email')
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        profile_obj.save()
        my_profile_url = "/profile/" + user.username
        return redirect(my_profile_url)
    return render(
        request,
        'profiles/update.html',
        context={"form": form},
    )


def profile_detail_view(request, username, *args, **kwargs):
    queryset = Profile.objects.filter(user__username__iexact=username)
    get_object_or_404(queryset)
    return render(
        request,
        'profiles/detail.html',
        context={"profile_username": username},
        status=200
    )
