const yelp = require('../config/yelp.js');
const express = require('express');
const router = express.Router();

router.post("/searchInterest", function (req, res) {
    var searchRequest = {
        location: req.body.address,
        term: req.body.target,
        sort_by: 'rating',
        radius: Number(req.body.radius),
        limit: 3,
        offset: Math.floor(Math.random() * (25))
    };
    yelp.searchInterest(searchRequest).then(documentReference => {
        const prettyJson = JSON.stringify(documentReference, null, 4);
        res.send(prettyJson);
    });
});

router.post("/interestHopping", function (req, res) {
    // Async function still having problem, you may see error in the console
    // However, result array should return correctly
    var searchRequest = {
        location: req.body.address,
        term: req.body.target,
        sort_by: 'rating',
        radius: Number(req.body.radius),
        limit: 3,
        hopping_limit: 5,
        offset: Math.floor(Math.random() * (25))
    };
    yelp.interestHopping(searchRequest).then(documentReference => {
        const prettyJson = JSON.stringify(documentReference, null, 4);
        res.send(documentReference);
    });
});

router.post("/interestHoppingWithBudget", function (req, res) {
    // Async function still having problem, you may see error in the console
    // However, result array should return correctly
    var searchRequest = {
        location: req.body.address,
        term: req.body.target,
        price: req.body.price,
        sort_by: 'rating',
        radius: Number(req.body.radius),
        limit: 3,
        hopping_limit: 5,
        offset: Math.floor(Math.random() * (25))
    };
    yelp.interestHopping(searchRequest).then(documentReference => {
        const prettyJson = JSON.stringify(documentReference, null, 4);
        res.send(documentReference);
    });
});
/*
router.post("/interestHoppingReservation",function(req,res){
    var searchRequest = {
        reservedTime: req.body.reservation_time,
        reservedDate : req.body.reservation_date,
        reservedConver: req.body.reserved_conver,

    }
}
*/


router.post("/customItinerary/:id", function (req, res) {
    let id = req.params.id.toString();

    var searchRequest = {
        location: req.body.address,
        term: '',
        sort_by: 'rating',
        radius: Number(req.body.radius),
        limit: 3,
        hopping_limit: 6,
        offset: Math.floor(Math.random() * (25))
    };
    yelp.createCustomItinerary(id, searchRequest, function(result){
        res.send(result);
    });
});


module.exports = router;