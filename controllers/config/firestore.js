const admin = require('firebase-admin');
// service account creds are generated through firebase console and should not be version controlled
const service_account_creds = {
    "type": "service_account",
    "project_id": "planit-c2234",
    "private_key_id": "c04e6130590c98ecc7d32b755eb1a2478fa94ae5",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCd/aOJGjeLQ7zF\nBcVZI5AIz3peOjOqB6WI3LvP2hYO4q86SC53hJc9gRIlKABFm5FRLhV2vik07PuH\nX/nGXh4kbrneZc7tVq4yUBzVoCME1nFF8y7Fm4XwSsKtGAdGB5Ufjh4qthDHM8I3\nTu3ZjFhoCNb+QhS0pPJJalx30dfkKXmU9dBcOAq0nXUc+jeP90OxXabh1sKD6fZ0\n3qFfkQq0AEOtjyFQ1UNZ+LeWXdL5ggplOPopiGucGIWoofT7b3Tcx17h04hd6t5P\nCmd8REt0L55VRZmDStmELJMiZfXh/yexlNi4EHtgepbC4B87u4s/dY/HGZ3Qrul7\nEs4n+KsNAgMBAAECggEAA3XoTJr953eC3X/sXDD6uS6uO/0jX5COUCqhlIJu5EGT\n2/9zwRtu4qJ+nsC7DMtFChWr06+DoIymT8dK5czu9RZVzOjG+QzigOifURCSY8s8\nrO8QMbTf4K0KiZcSpbaJziijQYU+Zdac5PA+Jns7/n9fEi+pW3GXewMw5lD63R0A\npNHMoGu7H2ORhymtbfoz7jHui8S/IKMrNrADuC9RdqmJQ0Vj0FgCPkn7Jjfvat8U\nXqTSIq43zxrJRHRq9iF3qF1MPPTJg46cgYhZ7kCBkngpyK7qj5lJzUrtfdOwjXAe\nrgB3Fsg5qYzLzornB0Et9VqZPP5cdTiUDis2ZItOQQKBgQDJt/H2EzzvP/FXoNI/\nU9ngb5Uz7UriR7Rzd72Do7CKlYsKH6rHnpOcZ23pgiMmReAGQoEOe+q497zja2kW\nhehp7oH6e5EDEEnokk/rXi6TjJMT5cy241C6f6QpdMuHIorSiumrLaecDOaNrR+o\nAKMh3KXGKOY5Tflo/26hjyFj7QKBgQDIgVxn2Afwi3cTR1USbCcIxSa+zRUIvOoD\namh3fXP1BWbh2QhytfGnQEGcBTvmEianijU9iKM6YvstYv8Doh+8Oc3M28c1FIoI\nWPm2Dtk0eeS4ps8+u3evz7RpL9g/Sbj4e/nlidGQobJJ8EOeWO3uD7KGMN0WS8Z7\nzVw0fLe/oQKBgDTKJdFPQZAfPMrA9KTMDeXVbceUHxfOyiO5v2f265mo/yUcGnZ5\nQooY60PD4ez/NlyNBPdEaK4Vb2JY1rylOKiYWX2y3sVdeuoZeD7RfADzNf5sEkH+\nhT75bn3G6gioeooU/ofkv8tv+No052bxG8Ad3WhZhb6TcGURC+PN8GAVAoGAcpjF\nCLEHMKt1XjZp4AKieLe9wlWSjRD0KwmZNZolOUhiGfkig/WLbU0jcpnnN0LuhtlO\nPqImsMs7xiALorb5rmnXPxvqCmN31PeNmUl5SS3V1Ne6IZ+h84EiGvB2hw2Kw7KQ\nDGottZ1FOk8xRoKLUoH0RhANfJ3Ijp+78F/L4aECgYB7KVRtRBnrwg4XoDEinUDl\nMCRIIapQn5cQ2GxHw3QOTp+gv8ItoIUxaFfYKQUJNIz0UrRkqv+FXeoS3fg7v7GQ\n1YcLrlmnNv6NSZ4GRlYhVbze0skbCl1/IFhD9JVjGbbazauSAU9bw+11OJrWGT26\nd7SSxptsW7Ul5D0BR8+tWw==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-bgs81@planit-c2234.iam.gserviceaccount.com",
    "client_id": "106635379635598391274",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bgs81%40planit-c2234.iam.gserviceaccount.com"
};

admin.initializeApp({
    credential: admin.credential.cert(service_account_creds),
    databaseURL: "https://planit-c2234.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;


// queries below

