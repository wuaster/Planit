//var myArgs = process.argv.slice(2);
//Testing use, if use as standlone

const yelp = require('yelp-fusion');
// More information: https://www.yelp.com/developers/v3/manage_app
// Yelp account ID: edison.fok@mail.utoronto.ca PW: fpnSQEnQX9y@T$A
const clientId = 'W44gsJljq--uXmdUAqPRCA';
const clientSecret = 'qWRANDYWIwCA_jOrSjKq0uanPheAYMFoQUiSW26FyZCSx16ygbGxGmRerG-KUgvkqXpcPDUlIm2eFjJVrtPDE9YilD0BTTxDjKamI79ELF2xlAchY9GVJ9BcX-GuXXYx';

//var searchRequest = {};
// A demo rand research
// More information : https://www.yelp.com/developers/documentation/v3/business_search


var sort = 'rating';

const searchInterest = async function (incomeJSON) {
    var result = [];
    var searchRequest = incomeJSON;
    const client = yelp.client(clientSecret);
    if (incomeJSON == undefined) {
        console.log("No result, please search again");
        return result;
    }
    let output = await client.search(searchRequest).then(response => {
        var numInterest = response.jsonBody.total;
        if (response.jsonBody.total == 0 || response.jsonBody.businesses[0] == undefined) {
            console.log("No result, please search again");
            return result;
        } else if (numInterest > 10) {
            numInterest = 10;
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
            result.push({
                name: name, price: price, url: url, image: image_url, distance: distance,
                address: address, latitude: latitude, longitude, longitude
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
        let output = await searchInterest(searchRequest).then(documentReference => {
            var currentInterest = documentReference[0];
            result.push({
                name: currentInterest.name, rating: currentInterest.price,
                url: currentInterest.url, image: currentInterest.image_url,
                distance: currentInterest.distance, address: currentInterest.address,
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
 
/* Under construction of getting restaurant details
const getRestDetails = async function(incomeJSON){
    var result =[];
    var searchRequest = incomeJSON;
    for (var i = 0; i < hoppinglimit; i++) {
        let output = await searchInterest(searchRequest).then(documentReference => {
            var currentInterest = documentReference[0];
            result.push({
                categories: 
                categories[x].alias:
                categories[x].title:
                coordinates:
                coordinates 
                
                
            });
            var currentAddress = currentInterest.address.join();
            searchRequest.location = currentAddress;
        }).catch(e => {
            console.log(e);
        });
    }
    return result;
}
*/ 

module.exports.searchInterest = searchInterest;
module.exports.interestHopping = interestHopping;