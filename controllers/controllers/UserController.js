const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const user = new User();

router.post('/addUser', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var id = req.body.id;
    user.addUser(id, name, email); 
});

//Get User's data
router.get('/getUserItineraries/:id', (req, res) => {

    let id = req.params.id.toString();
    user.getUserItineraries(id, res);
});

//add User's itinerary
router.put('/addItinerary/:id', (req, res) => {
    let id = req.params.id.toString();
    let body = req.body;

    let results = body.activities;
    let startTime = new Date(body.startTime);
    startTime.setHours(startTime.getHours() - 1);

    let activities = [];
    let tags = '';
    var middleActivity = Math.floor(results.length/2);

    for (var i = 0; i < results.length; i ++) {

        var url = results[i].url;
        var url_location = url.substring(
            25, 
            url.indexOf("?")
        );

        var reservation_link = `https://www.yelp.com/reservations/${url_location}`;

        var time = startTime;
        (i > 0) ? time.setHours( startTime.getHours() + 1) : time.setHours( startTime.getHours());
        var startTimeString = time.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: true });
  
        activities.push(
            {
                activityName: results[i].name,
                activityAddress: results[i].address[0],
                activityTime: startTimeString,
                activityType: results[i].activityType,
                reservationLink: reservation_link,
                
            }
        )
        if(i == 0) {
            tags = results[i].categories;
        } else {
            if(!tags.includes(results[i].categories)) {
                tags = tags + ', ' + results[i].categories;
            }
        }
    }

    let newItinerary = {
        activities: activities,
        tags: tags,
        imageRef: results[middleActivity].image_url,
        name: "Toronto"
    }

    user.addUserItinerary(id, newItinerary);

});

//Update users ratings
router.put('/updateUserRating/:id', (req, res) => {

    let id = req.params.id.toString();
    let body = req.body;
    let activity = req.body.activity;
    let like = req.body.like

    user.userUpdateRating(id, activity, like);

});
module.exports = router;