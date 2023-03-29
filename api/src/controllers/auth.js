

const express = require('express');
const mongoose = require('mongoose');

const db = mongoose.connection;

const { G_JWT_TOKEN } = require('../config');

const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

const login = (req, res) => {
    const { email, password } = req.body;

    if (email && password) {

        const user = { email, password };

        db.collection('users').findOne(user, (err, result) => {
            if (err) {
                res.status(500).send('Error logging in');
            } else {
                if (result) {

                    userId = result._id;

                    accessToken = jwt.sign({ userId: userId }, G_JWT_TOKEN);
                    // refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

                    res.status(200).send(
                        {
                            "status": 1,
                            "class": "success",
                            "message": "Login successful",
                            "accessToken": accessToken,
                            // "refreshToken": refreshToken
                        }
                    );
                } else {
                    res.status(401).send('Incorrect email or password');
                }
            }
        }
        );

    }
};

const userIdGenerator = (data) => {
    const userId = `${data}_${Math.floor(Math.random() * 1000000000)}`;
    return userId;
};

const Register = (req, res) => {
    const { email, password } = req.body;

    userObj = {
        _id: userIdGenerator(email),
        email: email,
        password: password,
        // createdAt: new Date()
    };

    if (email && password) {

        db.collection('users').insertOne(userObj, (err, result) => {
            if (err) {
                res.status(500).send('Error registering new user please try again');
            } else {
                res.status(200).send('Welcome to the club!');
            }
        }
        );
    }
};


const getCurrentUser = (req, res) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const tokenData = jwt.verify(token, G_JWT_TOKEN);

    if (tokenData?.userId) {
        db.collection('users').findOne({ _id: tokenData?.userId }, (err, result) => {
            if (err) {
                res.status(500).send('Error logging in');
            } else {
                if (result) {

                    res.status(200).send(
                        {
                            "status": 1,
                            "class": "success",
                            "message": "Login successful",
                            "payload": result
                        }
                    );
                } else {
                    res.status(401).send('Incorrect email or password');
                }
            }
        }
        );



    }
}


// const authUser = (req, res) => {

//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     const tokenData = jwt.verify(token, G_JWT_TOKEN);


//     const data = db.collection('users').findOne({ _id: tokenData?.userId }, (err, result) => {
//         return result;
//     }
//     );

//     return data;


// }

const authUser = async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const tokenData = jwt.verify(token, G_JWT_TOKEN);
    const user = await db.collection('users').findOne({ _id: tokenData?.userId });
    
    return user;
    
}



module.exports = {
    login,
    Register,
    getCurrentUser,
    authUser
};