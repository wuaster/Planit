//var myArgs = process.argv.slice(2);
//Testing use, if use as standlone

const yelp = require('yelp-fusion');
// More information: https://www.yelp.com/developers/v3/manage_app
// Yelp account ID: edison.fok@mail.utoronto.ca PW: fpnSQEnQX9y@T$A
const clientId = 'W44gsJljq--uXmdUAqPRCA';
const clientSecret = 'qWRANDYWIwCA_jOrSjKq0uanPheAYMFoQUiSW26FyZCSx16ygbGxGmRerG-KUgvkqXpcPDUlIm2eFjJVrtPDE9YilD0BTTxDjKamI79ELF2xlAchY9GVJ9BcX-GuXXYx';
const user = require('../config/user.js');

//var searchRequest = {};
// A demo rand research
// More information : https://www.yelp.com/developers/documentation/v3/business_search

var sort = 'rating';

const searchInterest = async function (incomeJSON) {
    var result = [];
    var searchRequest = incomeJSON;
    const client = await yelp.client(clientSecret);
    if (incomeJSON == undefined) {
        //console.log("No result, please search again");
        return result;
    }
    let output = await client.search(searchRequest).then(response => {
        var numInterest = response.jsonBody.total;
        if (response.jsonBody.total == 0 || response.jsonBody.businesses[0] == undefined) {
            //console.log("No result, please search again");
            return result;
        } else if (numInterest != searchRequest.limit) {
            numInterest = searchRequest.limit;
        }

        for (var i = 0; i < numInterest; i++) {
            var name = response.jsonBody.businesses[i].name;
            var price = response.jsonBody.businesses[i].price;
            var url = response.jsonBody.businesses[i].url;
            var image_url = response.jsonBody.businesses[i].image_url;
            var distance = Math.floor(response.jsonBody.businesses[i].distance) / 1000;
            var address = response.jsonBody.businesses[i].location.display_address;
            var latitude = response.jsonBody.businesses[i].coordinates.latitude;
            var longitude = response.jsonBody.businesses[i].coordinates.longitude;
            var url = response.jsonBody.businesses[i].url;
            var categories = response.jsonBody.businesses[i].categories[0].title;
            var activityType = incomeJSON.term;
            if(activityType == "food"){
                activityType = "restaurant";
            }
            result.push({
                name: name, price: price, url: url, image_url: image_url, distance: distance,
                address: address, latitude: latitude, longitude: longitude, categories: categories,
                activityType: activityType
            });
        }
    }).catch(e => {
        console.log(e);
        /*
        if (e.status === 400) {
            console.log('Bad request, often due to missing a required parameter.');
        } else if (e.status === 401) {
            console.log('No valid API key provided.');
        } else if (e.status === 404) {
            console.log('The requested resource doesn\'t exist.');
        }
        */
    });
    return result;
}

const interestHopping = async function (incomeJSON) {
    // Async function still having problem, you may see error in the console
    // However, result array should return correctly
    var result = [];
    var searchRequest = incomeJSON;
    var hoppinglimit = Number(incomeJSON.hopping_limit);
    delete searchRequest.hoppinglimit;
    var currentInterest;

    for (var i = 0; i < hoppinglimit; i++) {
        var searchRequest = searchRequest;
        let output = await searchInterest(searchRequest).then(documentReference => {
            var currentInterest = documentReference[0];
            if (result.latitude == undefined || result.longitude == undefined){
                return result;
            } else if ((result.latitude == currentInterest.latitude) && (result.longitude == currentInterest.longitude)) {
                currentInterest = documentReference[1];
            }
            result.push({
                name: currentInterest.name, price: currentInterest.price,
                url: currentInterest.url, image_url: currentInterest.image_url,
                distance: currentInterest.distance, address: currentInterest.address,
                url: currentInterest.url,
                latitude: currentInterest.latitude, longitude: currentInterest.longitude
            });
            var currentAddress = currentInterest.address.join();
            searchRequest.location = currentAddress;
        }).catch(e => {
            console.log(e);
        });
    }
    return result;
}

const interestHoppingwithPoints = async function (incomeJSON, requirement) {
    // This function will calculate how many points assigned to each interest
    var result = [];
    var points;
    var searchRequest = incomeJSON;
    if (searchRequest.price <= requirement.price) {
        points++;
    }
    if ((result.latitude == requirement.latitude) && (result.longitude == requirement.longitude)) {
        points -= 100;
    }
}

const createCustomItinerary = async function(id, searchRequest, callback){
    var food_res = [];
    var ent_res = [];
    var hike_res = [];
    let preferHiking = 0;

    // get user rating information
    user.getUserInfo(id, function (result) {
        hiking = result.hiking;
        entertainment = result.entertainment;
        food = result.restaurant;

        if (hiking > entertainment) {
            preferHiking = 1;
        } else if (hiking < entertainment) {
            preferHiking = -1;
        }

        searchRequest.term = "hiking";
        searchInterest(searchRequest).then(documentReference => {
            // get hiking activities around start position
            hike_res = documentReference;

            searchRequest.term = "food";
            searchInterest(searchRequest).then(documentReference => {
                // get food activities around start position
                food_res = documentReference;

                searchRequest.term = "entertainment";
                searchInterest(searchRequest).then(documentReference => {
                    // get entertainment activites around start position
                    ent_res = documentReference;

                    // final custom itinerary will be saved in fullItinerary
                    let fullItinerary = [];
                    let activity;

                    // first activity
                    if (hike_res.length != 0) {
                        activity = hike_res.pop();
                        fullItinerary.push(activity);
                        hike_res = hike_res.filter(place => place.name != activity.name);
                    }

                    // lunch
                    if (food_res.length != 0) {
                        activity = food_res.pop();
                        fullItinerary.push(activity);
                        food_res = food_res.filter(place => place.name != activity.name);
                    }

                    // activities between lunch and diner will be dependant on previous rating
                    // by default we have 1 hiking activity and 1 entertainment
                    let hike_count = 1;
                    let ent_count = 1;

                    if ((preferHiking == 1 && hike_res.length > 1) || (ent_res == 0 && hike_res.length > 0)) {
                        // adds 2 hiking activites only if hiking has a higher rating or if there are
                        // not enough entertainment activities
                        hike_count = 2;
                        ent_count = 0;
                    } else if ((preferHiking == -1 && ent_res.length > 1)|| (hike_res == 0 && ent_res.length > 0)) {
                        // adds 2 entertainment activites only if entertainment has a higher rating or 
                        // if there are not enough hiking activities
                        ent_count = 2;
                        hike_count = 0;
                    }

                    while (hike_res.length != 0 && hike_count > 0) {
                        activity = hike_res.pop();
                        fullItinerary.push(activity);
                        hike_res = hike_res.filter(place => place.name != activity.name);
                        hike_count -= 1;
                    }

                    while (ent_res.length != 0 && ent_count > 0) {
                        activity = ent_res.pop();
                        fullItinerary.push(activity);
                        ent_res = ent_res.filter(place => place.name != activity.name);
                        ent_count -= 1;
                    }

                    // diner
                    if (food_res.length != 0) {
                        activity = food_res.pop();
                        fullItinerary.push(activity);
                        food_res = food_res.filter(place => place.name != activity.name);
                    }

                    // final activity
                    if (ent_res.length != 0) {
                        activity = ent_res.pop();
                        fullItinerary.push(activity);
                        ent_res = ent_res.filter(place => place.name != activity.name);
                    }
                    callback(fullItinerary);
                });
            });
        });
    });
}

module.exports.searchInterest = searchInterest;
module.exports.interestHopping = interestHopping;
module.exports.createCustomItinerary = createCustomItinerary;