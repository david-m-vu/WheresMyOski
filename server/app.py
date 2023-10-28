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

# test get method 
@app.route("/")
def home():
  result = firebase.get('/restaurants', None)
  return str(result)

# test submit method 
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

# # post username method 
# @app.route('/submit-username', methods=['GET', 'POST'])
# def submit_username():
#    if request.method == 'POST':
#       userdata = dict(request.form)
#       new_data = {"username": userdata["username"]}
#       firebase.post("/Users", new_data)
#       return "Success"
#    else:
#       return "Failed"


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
    else:
       return "Sign up failed"

@app.route("/store_email", methods = ["GET", "POST"])
def store_email():
    if request.method == "POST":
        userdata = dict(request.form)
        new_data = {"email": userdata['email'], "enable_alerts": 0, "name": "", "points": 0, "rank": 0}
        firebase.post("/Users", new_data)
        return "Success"
    else:
       return "Store failed"
    
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
      return "Sign in failed"

if __name__ == "__main__":
  app.run()

