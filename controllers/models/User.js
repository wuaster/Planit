const db = require('../config/firestore.js');
let admin = require('firebase-admin');

class User {

    addUser(id, name, email) {
        let userCollection = db.collection('users');
        let query = userCollection.where('id', '==', id).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    userCollection.add({ id: id, name: name, email: email, itineraries: [], hiking: 0, restaurant: 0, entertainment: 0 }).then(documentReference => {
                        let firestore = documentReference.firestore;
                        console.log(`Root location for document is ${firestore.formattedName}`);
                    });
                }
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    getUserItineraries(id, res) {
        let query = db.collection('users').where('id', '==', id);

        query.get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                res.send(JSON.stringify(documentSnapshot.data().itineraries));
            });
        });
    }

    addUserItinerary(id, newItinerary) {
        let userCollection = db.collection('users');

        userCollection.where('id', '==', id).get().then(results => {
            const docId = results.docs[0].id;

            let userRef = userCollection.doc(docId);

            // Atomically add a new region to the "itinerary" array field.
            let arrUnion = userRef.update({
                itineraries: admin.firestore.FieldValue.arrayUnion(newItinerary)
            });
        });
    }

    userUpdateRating(id, rating_type, like) {
        let userCollection = db.collection('users');
        let increment;
        if (like) {
            increment = admin.firestore.FieldValue.increment(1);
        } else {
            increment = admin.firestore.FieldValue.increment(-1);
        }
        userCollection.where('id', '==', id).get().then(results => {
            const docId = results.docs[0].id;
            let userRef = userCollection.doc(docId);
            let arrUnion = userRef.update({ [rating_type]: increment });
        });
    }

}

module.exports = User;