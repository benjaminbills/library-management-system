# Generated by Django 3.2.8 on 2021-11-16 05:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_collectedbooks_student'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='collectedbooks',
            name='user',
        ),
    ]