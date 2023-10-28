from flask import Flask, render_template, request
#import pyrebase
from firebase import firebase
import requests
import json
import auth

app = Flask(__name__)
firebase = firebase.FirebaseApplication('https://oskiproject-7240e-default-rtdb.firebaseio.com/', None)
sign_up_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'
sign_in_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?'
with open('config.json', 'r') as configfile:
    configdata = json.load(configfile)


@app.route("/")
def home():
  result = firebase.get('/restaraunt', None)
  return str(result)

if __name__ == "__main__":
  app.run()