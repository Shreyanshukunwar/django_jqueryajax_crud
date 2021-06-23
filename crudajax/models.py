from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=70, null=True)
    email = models.EmailField(max_length=100, null=True)
    address = models.CharField(max_length=70, null=True)

    def __str__(self):
        return self.name
