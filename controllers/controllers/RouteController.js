const express = require('express');
const router = express.Router();

// Base URL for google maps api
BASE_URL = "https://www.google.com/maps/dir/?api=1";

// Example URL
// https://www.google.com/maps/dir/?api=1&origin=Paris,France&destination=Cherbourg,France&
// travelmode=driving&waypoints=Versailles,France%7CCaen,France%7CLe+Mans,France%7CChartres,France

router.post('/getRoute', (req, res) => {
    var origin = encodeURIComponent(req.body.origin);
    var destinations = req.body.destinations;
    var travelMode = "driving";
    var url = `${BASE_URL}&origin=${origin}&destination=${origin}&travelmode=${travelMode}&waypoints=`;

    for (var i = 0; i < destinations.length; i ++) {
        var dest = encodeURIComponent(destinations[i].address);
        url = url + `${dest}|`;

    }
    console.log(url);
    res.send({"url": url});
});

module.exports = router;
