from django.db import models

# User model
class User(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=255)
  email = models.CharField(max_length=255)
  profile_image = models.ImageField(upload_to="media/profile_images/")
  address = models.CharField(max_length=255)

  def __str__(self):
    return self.name
  