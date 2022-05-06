from django.core import management

from arine import celery_app


@celery_app.task
def clearsessions():
    management.call_command('clearsessions')
