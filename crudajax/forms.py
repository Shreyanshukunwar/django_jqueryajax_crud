from django import forms

from .models import User

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'

        widgets = {
            'name': forms.TextInput(attrs={'class':'form-control', 'id':'nameid'}),
            'email': forms.TextInput(attrs={'class':'form-control', 'id':'emailid'}),
            'address': forms.TextInput(attrs={'class':'form-control', 'id':'addressid'})
        }


