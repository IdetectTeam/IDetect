# Imports the Google Cloud client library
from google.cloud import datastore


def connect_to_sql(site, con):
    # Instantiates a client
    datastore_client = datastore.Client()

    # The kind for the new entity
    kind = 'configuration'
    # The name/ID for the new entity
    id =
    # The Cloud Datastore key for the new entity
    task_key = datastore_client.key(kind, id)

    # Prepares the new entity
    task = datastore.Entity(key=task_key)
    task['user'] = ''
    task['config'] = ""
    # Saves the entity
    datastore_client.put(task)

    print('Saved {}: {}'.format(task.key.name, task['user']))
