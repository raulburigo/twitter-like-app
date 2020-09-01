from django import forms
# from django.contrib.auth.models import User
from .models import Profile


class ProfileForm(forms.ModelForm):
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
    email = forms.CharField(
        required=False,
        # widget=forms.TextInput
        # (attrs={'placeholder': 'enter your e-mail'})
    )

    class Meta:
        model = Profile
        fields = ['location', 'bio']
