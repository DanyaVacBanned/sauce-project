# Generated by Django 4.2.4 on 2023-09-02 19:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import main_app.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='SauceUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('phone_number', models.BigIntegerField(blank=True, null=True, verbose_name='Номер телефона')),
                ('email', models.EmailField(blank=True, max_length=254, null=True, unique=True, verbose_name='email')),
                ('username', models.CharField(blank=True, max_length=200, null=True, verbose_name='Имя пользователя')),
                ('second_name', models.CharField(blank=True, max_length=200, null=True, verbose_name='Фамилия')),
                ('address', models.CharField(blank=True, max_length=300, null=True, verbose_name='Адресс основного объекта')),
                ('other_objects', models.TextField(blank=True, null=True, verbose_name='Прочие объекты компании')),
                ('specialization', models.CharField(blank=True, max_length=150, null=True, verbose_name='Специальность')),
                ('city', models.CharField(blank=True, max_length=200, null=True, verbose_name='Город')),
                ('profile_image', models.ImageField(blank=True, default=main_app.models.get_default_profile_image, null=True, upload_to=main_app.models.get_profile_image_filepath, verbose_name='Фото профиля')),
                ('experience', models.IntegerField(blank=True, null=True, verbose_name='Стаж работы')),
                ('profile_description', models.TextField(blank=True, null=True, verbose_name='Описание профиля')),
                ('citizenship', models.CharField(blank=True, max_length=50, null=True, verbose_name='Гражданство')),
                ('role', models.CharField(choices=[('EMPLOYER', 'Employer'), ('CANDIDATE', 'Candidate')], max_length=50)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Employer',
            fields=[
                ('sauceuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('main_app.sauceuser',),
        ),
    ]
