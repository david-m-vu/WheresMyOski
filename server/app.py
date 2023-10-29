from flask import Flask, render_template, request
from firebase import firebase
import requests
import pyrebase  
import json 
import datetime
from Blueprints.authen import auth_bp
from Blueprints.test import test_bp
from Blueprints.feed import feed_bp

app = Flask(__name__)
app.register_blueprint(auth_bp)
app.register_blueprint(test_bp)
app.register_blueprint(feed_bp)

firebase = firebase.FirebaseApplication('https://oskiproject-7240e-default-rtdb.firebaseio.com/', None)
sign_up_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'
sign_in_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?'

with open('config.json', 'r') as configfile:
    config_data = json.load(configfile)

firebase1 = pyrebase.initialize_app(config_data)
auth = firebase1.auth()
db = firebase1.database()

# store email endpoint
@app.route("/store_current_user", methods = ["GET", "POST"])
def store_email():
    if request.method == "POST":
         userdata = dict(request.form)
         new_data = {"email": userdata['email'], "enable_alerts": 0, "name": "", "points": 0, "rank": 0, "unlocked": [True, True, False, False, False, False, False, False, False, False]}
         db.child("Users").push(new_data)
         #db.child("current_user").child("0").set({"email": userdata['email']})
         return "Success"
    else:
        return "Store failed"
    
# update username endpoint
@app.route("/update_username", methods = ["GET", "POST"])
def update_username():
    if request.method == "POST":
        userdata = dict(request.form)
        users = db.child("/Users").get()
        for user in users.each():
          if user.val()['email'] == userdata['email']:
             db.child("/Users").child(user.key()).update({"name": userdata['name']})
        return "update username success"
    else:
       return "update username failed"

if __name__ == "__main__":
  app.run()

