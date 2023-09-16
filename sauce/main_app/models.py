from PIL import Image

from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


def get_profile_image_filepath(self):
  return f'main_app/profile_image/{self.pk}/{"profile_image.png"}'


def get_default_profile_image():
  return "main_app/profile_image/anonimus.png"


class SauceUserManager(BaseUserManager):
  def create_user(self, email, username=None, password=None):
    if email is None:
      raise ValueError("Email не введен")

    user = self.model(
      email=self.normalize_email(email),
      username=username
    )
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_superuser(self, email, username=None, password=None):
    user = self.create_user(
      email=self.normalize_email(email),
      username=username,
      password=password,
      is_admin=True,
      is_staff=True,
      is_superuser=True
    )
    user.is_admin = True
    user.is_staff = True
    user.is_superuser = True
    user.save(using=self._db)
    return user


class SauceUser(AbstractUser):
  is_admin = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)

  phone_number = models.BigIntegerField(
    verbose_name="Номер телефона",
    null=True,
    blank=True,
    default=0
  )
  email = models.EmailField(
    verbose_name="email",
    blank=True,
    null=True,
    unique=True
  )
  username = models.CharField(
    verbose_name="Имя пользователя",
    max_length=200,
    null=True,
    blank=True,
    default="Имя не указано"
  )
  second_name = models.CharField(
    verbose_name="Фамилия",
    max_length=200,
    null=True,
    blank=True,
    default="Фамилия не указана"
  )

  city = models.CharField(
    verbose_name="Город",
    blank=True,
    null=True,
    max_length=200,
    default="Город не указан"
  )
  profile_image = models.ImageField(
    verbose_name="Фото профиля",
    upload_to=get_profile_image_filepath,
    default=get_default_profile_image,
    null=True,
    blank=True
  )

  profile_description = models.TextField(
    verbose_name="Описание профиля",
    null=True,
    blank=True,
    default="..."
  )
  citizenship = models.CharField(
    verbose_name="Гражданство",
    null=True,
    blank=True,
    max_length=50
  )

  class Role(models.TextChoices):
    EMPLOYER = "EMPLOYER", "Employer"
    CANDIDATE = "CANDIDATE", "Candidate"

  base_role = Role.CANDIDATE

  role = models.CharField(max_length=50, choices=Role.choices)

  is_admin = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)

  def save(self, *args, **kwargs):
    img = Image.open(self.profile_image.path)

    if img.height > 300 or img.width > 300:
      output_size = (300, 300)
      img.thumbnail(output_size)
      img.save(self.profile_image.path)

    if not self.pk:
      self.role = self.base_role
      return super().save(*args, **kwargs)

  objects = SauceUserManager()
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []

  def get_profile_image_filename(self):
    return str(self.profile_image)[str(self.profile_image).index(f"profile_images/{self.pk}/"):]

  def __str__(self):
    return self.username


class Employer(SauceUser):
  base_role = SauceUser.Role.EMPLOYER

  address = models.CharField(
    verbose_name="Адресс основного объекта",
    max_length=300,
    blank=True,
    null=True
  )
  other_objects = models.TextField(
    verbose_name="Прочие объекты компании",
    blank=True,
    null=True,
    default="Прочие объекты не указаны"
  )


class Candidate(SauceUser):
  experience = models.IntegerField(
    verbose_name="Стаж работы",
    null=True,
    blank=True,
    default=0
  )

  specialization = models.CharField(
    verbose_name="Специальность",
    blank=True,
    null=True,
    max_length=150,
    default="Специальность не указана"
  )


class Vacation(models.Model):
  employer = models.ForeignKey(SauceUser, on_delete=models.CASCADE, related_name='user_role')
  description = models.TextField()
  title = models.CharField(max_length=150)
  award = models.IntegerField()
  views_count = models.IntegerField(blank=True, null=True)
  deadlines = models.DateField()
  created = models.DateTimeField(auto_now_add=True)


class UrgentApplications(models.Model):
  user = models.ForeignKey(SauceUser, on_delete=models.CASCADE)
  title = models.CharField(max_length=150)
  description = models.TextField()
  deadlines = models.DateField()
  created = models.DateTimeField(auto_now_add=True)