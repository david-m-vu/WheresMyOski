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


@app.route("/signup", methods = ["GET", "POST"])
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