from flask import Flask, render_template, request
from firebase import firebase
import requests  
import json 

app = Flask(__name__)
firebase = firebase.FirebaseApplication('https://oskiproject-7240e-default-rtdb.firebaseio.com/', None)

with open('config.json', 'r') as config_file:
    config_data = json.load(config_file)

@app.route("/")
def home():
  result = firebase.get('/restaurants', None)
  return str(result)

@app.route('/submit', methods=['GET', 'POST'])
def submit():
  if request.method == 'POST' and len(request.form) > 0:
    userdata = dict(request.form)
    name = userdata["name"]
    address = userdata["address"]
    new_data = {"name": name, "address": address}
    firebase.post("/restaurants", new_data)
    return "Thank you!"
  else:
    return "Sorry, there was an error."

if __name__ == "__main__":
  app.run()