from flask import Flask, render_template, request
#import pyrebase
from firebase import firebase
import requests
import json

app = Flask(__name__)
firebase = firebase.FirebaseApplication('https://oskiproject-7240e-default-rtdb.firebaseio.com/', None)
sign_up_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'
sign_in_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?'
with open('config.json', 'r') as configfile:
    configdata = json.load(configfile)


<<<<<<< Updated upstream:server/auth.py
@app.route("/signup", methods = ["GET", "POST"])
=======
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
>>>>>>> Stashed changes:server/Blueprints/authen.py
def user_authentication():
    if request.method == "POST":
        userdata = dict(request.form)
        payload = {
            "key": configdata['apiKey'],
            "email": userdata['email'],
            "password": userdata['password'],
            "returnSecureToken": True 
        }

        result = requests.post(sign_up_url, data=payload)
        return result.text
        #return "deez"
    else:
       return "wtf"
    
<<<<<<< Updated upstream:server/auth.py
@app.route("/signin", methods = ["GET", "POST"])
def user_signin():
   if request.method == "POST":
        userdata = dict(request.form)
        payload = {
            "key": configdata['apiKey'],
            "email": userdata['email'],
            "password": userdata['password'],
            "returnSecureToken": True 
        }
      
        result = requests.post(sign_in_url, data=payload)
        return result.text
   else:
      return "wtf"
=======
# # log out of current user 
# @auth_bp.route("/log-out", methods = ["GET", "POST", "DELETE"])
# def log_out():
#    if request.method == "DELETE":
#       db.child("current_user").child("0").remove()
#       return "Success"
#    else:
#       return "Fail"
>>>>>>> Stashed changes:server/Blueprints/authen.py
