import requests
import random
import time

while True:
    requests.post("http://127.0.0.1:5000/energy", json={
        "value": random.randint(10,40)
    })
    time.sleep(2)