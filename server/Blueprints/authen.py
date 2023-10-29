from flask import Blueprint, render_template, Flask, request
from firebase import firebase
import requests
import pyrebase  
import json 
import datetime

auth_bp = Blueprint('auth', __name__)

firebase = firebase.FirebaseApplication('https://oskiproject-7240e-default-rtdb.firebaseio.com/', None)
sign_up_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'
sign_in_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?'

with open('config.json', 'r') as configfile:
    config_data = json.load(configfile)

firebase1 = pyrebase.initialize_app(config_data)
auth = firebase1.auth()
db = firebase1.database()

# sign in endpoint
@auth_bp.route("/signin", methods = ["GET", "POST"])
def user_signin():
   if request.method == "POST":
        userdata = dict(request.form)
        payload = {
            "key": config_data['apiKey'],
            "email": userdata['email'],
            "password": userdata['password'],
            "returnSecureToken": True 
        }
      
        result = requests.post(sign_in_url, data=payload)
        db.child("current_user").child("0").set({"email": userdata['email']}) # change this
        return result.text
   else:
      return "Sign in failed"

# sign up endpoint
@auth_bp.route("/signup", methods = ["GET", "POST"])
def user_authentication():
    if request.method == "POST":
        userdata = dict(request.form)
        payload = {
            "key": config_data['apiKey'],
            "email": userdata['email'],
            "password": userdata['password'],
            "returnSecureToken": True 
        }

        result = requests.post(sign_up_url, data=payload)
        
        return result.text
    else:
       return "Sign up failed"
    
# log out of current user 
@auth_bp.route("/log-out", methods = ["GET", "POST", "DELETE"])
def log_out():
   if request.method == "DELETE":
      db.child("current_user").child("0").remove()
      return "Success"
   else:
      return "Fail"