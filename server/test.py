from flask import Flask, render_template, request, Blueprint
from firebase import firebase
import requests
import pyrebase  
import json 
import datetime

test = Blueprint('test', __name__)

app = Flask(__name__)
firebase = firebase.FirebaseApplication('https://oskiproject-7240e-default-rtdb.firebaseio.com/', None)
sign_up_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'
sign_in_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?'

with open('config.json', 'r') as configfile:
    config_data = json.load(configfile)

firebase1 = pyrebase.initialize_app(config_data)
auth = firebase1.auth()
db = firebase1.database()

@app.route("/")
def home():
  result = firebase.get('/restaurants', None)
  return str(result)

# test post  
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