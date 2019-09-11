# Imports the Google Cloud client library
from google.cloud import datastore
<<<<<<< HEAD

# Instantiates a client
datastore_client = datastore.Client()

# The kind for the new entity
kind = 'configuration'
# The name/ID for the new entity
id = '7'
# The Cloud Datastore key for the new entity
task_key = datastore_client.key(kind, id)

# Prepares the new entity
task = datastore.Entity(key=task_key)
task['user'] = 'sari'
task['config'] = "31"
# Saves the entity
datastore_client.put(task)

print('Saved {}: {}'.format(task.key.name, task['user']))
=======
index = 0
def connect_to_sql(site, con):
    # Instantiates a client
    datastore_client = datastore.Client()

    # The kind for the new entity
    kind = 'configuration'
    # The name/ID for the new entity
    global index
    index = index+1
    id = index
    # The Cloud Datastore key for the new entity
    task_key = datastore_client.key(kind, id)

    # Prepares the new entity
    task = datastore.Entity(key=task_key)
    task['user'] = site
    task['config'] = con
    # Saves the entity
    datastore_client.put(task)
>>>>>>> 6366d974423c4767566e9816ae210c66d64f69d3

h = datastore_client.get(task_key)
print('h{}: {} '.format(h, h['config']))
