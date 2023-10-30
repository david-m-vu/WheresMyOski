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
      current_email = current_email.val()[0]['email']
      """
      current_user = ""
      for user in users.each():
          if user.val()['email'] == current_email:
             current_user = user.val()['name']
      """

      newdata = {"title": userdata["title"], "lat": userdata["lat"], "lon": userdata["lon"], "upvotes": 0, "downvotes": 0, "ranking": 0, "time": currTime[0], "date": currTime[1], "email": current_email}

      db.child("Posts").push(newdata)
      return "Success"

@feed_bp.route("/handle-upvote", methods = ["GET", "POST"])
def handle_upvote():
   if request.method == "POST":
      data = dict(request.form)
      userID = data['userid']
      postID = data['postid']
      upvote = data['upvote'] # if upvote was clicked
      downvote = data['downvote'] # if downvote was clicked 
      status = [data['left'], data['right']] # status of the upvote/downvote button on post 

      post = getPost(postID)
      if status == ["0", "0"]:
         if upvote == "1":
            handle_upvote_count(userID, postID)
            return ["1", "0"]

         if downvote == "1":
            handle_downvote_count(userID, postID)
            return ["0", "1"]
        
      elif status == ["1", "0"]:
         if upvote == "1":
            toggle_upvote(userID, postID)
            return ["0", "0"]
         
         if downvote == "1":
            toggle_upvote(userID, postID)
            handle_downvote_count(userID, postID)
            return ["0", "1"]
         
      elif status == ["0", "1"]:
         if upvote:
            toggle_downvote(userID, postID)
            handle_upvote_count(userID, postID)
            return ["1", "0"]
         if downvote:
            toggle_downvote(userID, postID)
            return ["0", "1"]
      
      return "error"
    
########## helper functions ##########
######################################
######################################

def getPost(post_id):
   post = db.child("Posts").child(post_id).get().val()
   return post 

def handle_upvote_count(user_id, post_id):
    post_ref = db.child("Posts").child(post_id)
    post_data = post_ref.get().val()

    post_data["upvotes"] += 1
    upvotes = post_data.get("upvotedBy", {})
    upvotes[user_id] = True

    post_data["upvotedBy"] = upvotes
    db.child("Posts").child(post_id).update(post_data)

def handle_downvote_count(user_id, post_id):
    post_ref = db.child("Posts").child(post_id)
    post_data = post_ref.get().val()

    post_data["downvotes"] += 1
    downvotes = post_data.get("downvotedBy", {})
    downvotes[user_id] = True

    post_data["downvotedBy"] = downvotes
    db.child("Posts").child(post_id).update(post_data)

def toggle_upvote(user_id, post_id):
    post_ref = db.child("Posts").child(post_id)
    post_data = post_ref.get().val()

    upvotes = post_data.get("upvotedBy", {})
    if user_id in upvotes:
        # User has already upvoted; subtract the upvote
        del upvotes[user_id]
        post_data["upvotedBy"] = upvotes
        post_data["upvotes"] = len(upvotes)
    else:
        # User has not upvoted; add the upvote
        upvotes[user_id] = True
        post_data["upvotedBy"] = upvotes
        post_data["upvotes"] = len(upvotes)

    # Update the post in the database
    post_ref.update(post_data)

def toggle_downvote(user_id, post_id):
    post_ref = db.child("Posts").child(post_id)
    post_data = post_ref.get().val()

    downvotes = post_data.get("downvotedBy", {})
    if user_id in downvotes:
        # User has already downvoted; subtract the downvote
        del downvotes[user_id]
        post_data["downvotedBy"] = downvotes
        post_data["downvotes"] = len(downvotes)
    else:
        # User has not downvoted; add the downvote
        downvotes[user_id] = True
        post_data["downvotedBy"] = downvotes
        post_data["downvotes"] = len(downvotes)

    # Update the post in the database
    post_ref.update(post_data)

def getTime():
  current_time = datetime.datetime.now()
  current_time = datetime.datetime.now()

  # Extract and format the time as "HH:MM"
  time_formatted = current_time.strftime("%H:%M")

  # Extract and format the date as "MMM DD"
  date_formatted = current_time.strftime("%b %d")
  
  return [time_formatted, date_formatted]