# Generated by Django 4.2.4 on 2023-09-10 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmessage',
            name='chat_room',
            field=models.CharField(unique=True),
        ),
        migrations.DeleteModel(
            name='ChatRoom',
        ),
    ]
