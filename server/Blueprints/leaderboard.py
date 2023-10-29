from flask import Blueprint, render_template, Flask, request
from firebase import firebase
import requests
import pyrebase  
import json 
import datetime

leaderboard_bp = Blueprint('leaderboard', __name__)

firebase = firebase.FirebaseApplication('https://oskiproject-7240e-default-rtdb.firebaseio.com/', None)
sign_up_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?'
sign_in_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?'

with open('config.json', 'r') as configfile:
    config_data = json.load(configfile)

firebase1 = pyrebase.initialize_app(config_data)
auth = firebase1.auth()
db = firebase1.database()

@leaderboard_bp.route("/leaderboard", methods = ["GET", "POST"])
def leaderboard():
    users = db.child("/Users").get()
    posts = db.child("/Posts").get()

    # go through posts and get upvotes and downvotes per person and then total them up
    # and then sort them

    i = 0
    j = 0
    for post in posts.each():
        for user in users.each():
            if user.val()['email'] == post.val()['email']:
                user.val()['points'] += post.val()['upvotes']
                user.val()['points'] -= post.val()['downvotes']

                db.child("/Users").child(user.key()).update({"email": user.val()['email'], "points": user.val()['points'], "name": user.val()['name'], "enable_alerts": user.val()['enable_alerts']})
            i += 1
        j += 1

    i = i // j

    #rankedusers = []
    data_ref = db.child("/Users")
    ordered_data = data_ref.order_by_child('points').get()

    #return ordered_data
    #return list("hi")
    """
    skips = []
    max = -1000000
    index = 0
    rankedusers = []
    if i < 20:
        for k in range(i):
            max = -1000000
            for user in users.each():
                if user.val()['points'] > max and index not in skips:
                    max = user.val()['points']
                    index = k
                
                index += 1

            skips.append(index)
            rankedusers.append({"name": user.val()['name'], "points": user.val()['points']})
            index = 0
            max = -1000000
            #return skips
    else:
        for k in range(20):
            print("deez")
    """


    rankedusers = []
    for user in ordered_data.each():     
        # make json with all of the values
        rankedusers.append({"name": user.val()['name'], "points": user.val()['points']})

    return rankedusers
