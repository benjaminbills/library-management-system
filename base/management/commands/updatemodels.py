from django.core.management.base import BaseCommand
import pandas as pd
from base.models import Books, NewUser
class Command(BaseCommand):
    help = 'import booms'

    def add_arguments(self, parser):
      pass

    def handle(self, *args, **options):
      #Database Connections
      df = pd.read_csv('book.csv')
      for USER, TITLE, AUTHOR, SUBJECT, PUBLISHED in zip(df.user,df.title, df.author, df.subject, df.published):
        userDb = NewUser.objects.get(pk=USER)
        models= Books(user=userDb, title=TITLE, author=AUTHOR, subject=SUBJECT, published=PUBLISHED)
        models.save()
