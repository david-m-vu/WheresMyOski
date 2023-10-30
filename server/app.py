from flask import Flask, render_template, request
from firebase import firebase
import requests  
import json 
import auth

app = Flask(__name__)
firebase = firebase.FirebaseApplication('https://oskiproject-7240e-default-rtdb.firebaseio.com/', None)
sign_up_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'
sign_in_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?'

with open('config.json', 'r') as configfile:
    config_data = json.load(config_file)

@app.route("/")
def home():
  result = firebase.get('/restaurants', None)
  return str(result)

<<<<<<< Updated upstream
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

@app.route("/")
def home():
  result = firebase.get('/restaraunt', None)
  return str(result)

@app.route("/signup", methods = ["GET", "POST"])
def user_authentication():
=======
# store email endpoint
@app.route("/store_current_user", methods = ["GET", "POST"])
def store_email():
    if request.method == "POST":
         userdata = dict(request.form)
         new_data = {"upvoted_posts": {}, "downvoted_posts": {}, "email": userdata['email'], "enable_alerts": 0, "name": "", "points": 0, "rank": 0, "unlocked": [True, True, False, False, False, False, False, False, False, False]}
         result = db.child("Users").push(new_data)
         #db.child("current_user").child("0").set({"email": userdata['email']})
         return result["name"]
    else:
        return "Store failed"
    
# update username endpoint
@app.route("/update_username", methods = ["GET", "POST"])
def update_username():
>>>>>>> Stashed changes
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

if __name__ == "__main__":
  app.run()

