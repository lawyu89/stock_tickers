web: gunicorn arine.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=arine worker --loglevel=info
beat: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=arine beat -S redbeat.RedBeatScheduler --loglevel=info
