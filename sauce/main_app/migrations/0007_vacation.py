# Generated by Django 4.2.4 on 2023-09-10 13:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0006_alter_candidate_experience_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vacation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('title', models.CharField(max_length=150)),
                ('award', models.IntegerField()),
                ('views_count', models.IntegerField()),
                ('deadlines', models.DateField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('employer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_role', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]