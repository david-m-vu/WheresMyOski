from flask import Blueprint, render_template, Flask, request
from firebase import firebase
import requests
import pyrebase  
import json 
import datetime

feed_bp = Blueprint('feed', __name__)

firebase = firebase.FirebaseApplication('https://oskiproject-7240e-default-rtdb.firebaseio.com/', None)
sign_up_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'
sign_in_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?'

with open('config.json', 'r') as configfile:
    config_data = json.load(configfile)

firebase1 = pyrebase.initialize_app(config_data)
auth = firebase1.auth()
db = firebase1.database()

@feed_bp.route("/points_ranking", methods = ["GET", "POST"])
def points():
    if request.method == "GET":
      users = db.child("/Users").get()

      current_email = db.child("current_user").get()
      current_email = current_email.val()[0]['email']

      current_points = 0
      unlocked = []
      
      for user in users.each():
          if user.val()['email'] == current_email:
            current_points = user.val()['points']
      
            current_points = int(current_points / 10)

            for i in range(current_points):
               user.val()['unlocked'][i + 2] = True

            unlocked = user.val()['unlocked']

      return unlocked

# initialize feed 
@feed_bp.route("/init_feed", methods = ["GET", "POST"])
def init_feed():
    if request.method == "POST":
       newdata = {"numPosts": 0, "Posts": {"bananan": 1}}
       db.child("Feed").child("0").push(newdata)
       return "Success"
    else:
       return "Failed"
    
@feed_bp.route("/send-posts", methods = ["GET"])
def get_posts():
   if request.method == "GET":
      posts = db.child("Posts").get()
      return posts.val()

@feed_bp.route("/create-post", methods = ["GET", "POST"])
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