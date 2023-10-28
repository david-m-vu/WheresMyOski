from flask import Flask, render_template, request
from firebase import firebase
import requests  
import json 

app = Flask(__name__)
firebase = firebase.FirebaseApplication('https://oskiproject-7240e-default-rtdb.firebaseio.com/', None)
sign_up_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'
sign_in_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?'

with open('config.json', 'r') as configfile:
    config_data = json.load(configfile)

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

@app.route("/signup", methods = ["GET", "POST"])
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
        #return "deez"
    else:
       return "wtf"
    
@app.route("/signin", methods = ["GET", "POST"])
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
        return result.text
   else:
      return "wtf"

if __name__ == "__main__":
  app.run()

