# Generated by Django 3.2.8 on 2021-11-05 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_collectedbooks'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collectedbooks',
            name='returnedOn',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]