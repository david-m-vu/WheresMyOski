from flask import Flask, render_template, request
from firebase import firebase
import requests
import pyrebase  
import json 
import datetime

app = Flask(__name__)
firebase = firebase.FirebaseApplication('https://oskiproject-7240e-default-rtdb.firebaseio.com/', None)
sign_up_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'
sign_in_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?'

with open('config.json', 'r') as configfile:
    config_data = json.load(configfile)

firebase1 = pyrebase.initialize_app(config_data)
auth = firebase1.auth()
db = firebase1.database()

# test get  
@app.route("/home")
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

# sign up endpoint
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
    
# sign in endpoint
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
        db.child("current_user").child("0").set({"email": userdata['email']}) # change this
        return result.text
   else:
      return "Sign in failed"

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

# initialize feed 
@app.route("/init_feed", methods = ["GET", "POST"])
def init_feed():
    if request.method == "POST":
       newdata = {"numPosts": 0, "Posts": {"bananan": 1}}
       db.child("Feed").child("0").push(newdata)

       return "Success"

@app.route("/points_ranking")
def points():
    
    return 0

# log out of current user 
@app.route("/log-out", methods = ["GET", "POST", "DELETE"])
def log_out():
   if request.method == "DELETE":
      db.child("current_user").child("0").remove()
      return "Success"
   else:
      return "Fail"

@app.route("/create-post", methods = ["GET", "POST"])
def create_post():
   if request.method == "POST":
      userdata = dict(request.form)
      currTime = getTime()

      users = db.child("/Users").get()
      current_email = db.child("current_user").get()
      #return current_email
      current_email = current_email.val()[0]['email']
      """
      current_user = ""
      for user in users.each():
          if user.val()['email'] == current_email:
             current_user = user.val()['name']
      """

      newdata = {"title": userdata["title"], "lat": userdata["lat"], "lon": userdata["lon"], "upvotes": 0, "downvotes": 0, "upvotedBy": {}, "downvotedBy": {}, "ranking": 0, "time": currTime[0], "date": currTime[1], "email": current_email}

      db.child("Posts").push(newdata)
      return "Success"
   
   

def getTime():
  current_time = datetime.datetime.now()
  current_time = datetime.datetime.now()

  # Extract and format the time as "HH:MM"
  time_formatted = current_time.strftime("%H:%M")

  # Extract and format the date as "MMM DD"
  date_formatted = current_time.strftime("%b %d")
  
  return [time_formatted, date_formatted]



if __name__ == "__main__":
  app.run()

