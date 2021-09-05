require('dotenv').config();
const express = require('express');
const app = express();
const port = 8000
const qs = require('qs');
const axios = require('axios');

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

app.get('/slack/callback', (req, res) => {
    // slack oauth2 flow 
    const body = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://localhost:${port}/slack/callback`,
        refresh_token: process.env.REFRESH_TOKEN
    }
    
    axios.post(`https://slack.com/api/oauth.access`, qs.stringify(body), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(res => res.data)
        .then(_data => {
            admin
                .auth()
                .createCustomToken(_data["user_id"])
                .then((customToken) => {
                    res.cookie('custom_token', customToken, {
                        maxAge: 10000,
                        httpOnly: false,
                    })
                    res.redirect('http://localhost:3000/signin#success')
                }).catch(err => res.status(500).json({ message: err.message }));
        })
        .catch(err => res.status(500).json({ message: err.message }));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})