# Generated by Django 3.2.8 on 2021-11-16 05:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='collectedbooks',
            name='student',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.student'),
        ),
    ]
