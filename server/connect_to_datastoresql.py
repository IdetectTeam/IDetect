# Imports the Google Cloud client library
from google.cloud import datastore

# Instantiates a client
datastore_client = datastore.Client()

# The kind for the new entity
kind = 'configuration'
# The name/ID for the new entity
id = '10'
# The Cloud Datastore key for the new entity
task_key = datastore_client.key(kind, id)

# Prepares the new entity
task = datastore.Entity(key=task_key)
task['user'] = 'בישמן'
task['config'] = "יהודית"
# Saves the entity
datastore_client.put(task)

print('Saved {}: {}'.format(task.key.name, task['user']))

index = 0


def connect_to_sql(site, con):
    # Instantiates a client
    datastore_client = datastore.Client()
    # The kind for the new entity
    kind = 'configuration'
    # The name/ID for the new entity
    id = site
    # The Cloud Datastore key for the new entity
    task_key = datastore_client.key(kind, id)

    # Prepares the new entity
    task = datastore.Entity(key=task_key)
    task['config'] = con
    # Saves the entity
    datastore_client.put(task)
    print('Saved {}: {}'.format(task.key.name, task['config']))


def check_sql(site_name):
    # The kind for the new entity
    kind = 'configuration'
    # The name/ID for the new entity
    site = str(site_name)
    datastore_client = datastore.Client()
    key = datastore_client.key(kind, site)
    conf = datastore_client.get(key)
    if conf == None:
        return "false"
    return "true"
