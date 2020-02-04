const db = require('../config/firestore.js');
let admin = require('firebase-admin');

const getUserInfo = function (id, callback) {
    
    let query = db.collection('users').where('id', '==', id);
    let result = null;
    query.get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
            result = documentSnapshot.data();
            callback(result);
        });
    });
}
module.exports.getUserInfo = getUserInfo;