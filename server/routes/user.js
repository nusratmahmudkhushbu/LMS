const express = require('express');
const connection = require('../connection');
const encoder = require('../security/encode');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticated = require('../security/authentication');
const admin = require('../security/admin');
const sendNotification = require('../services/notificationService');
require('dotenv').config();

router.post('/signup', (req, res) => {
    let user = req.body;
    var query = "select email from user where email=?";
    connection.query(query,[user.email],(err,results)=> {
        if (!err) {
            if(results.length <= 0) {
                query = "insert into user(name, email, password, role) values(?,?,?,'USER')";
                connection.query(query,[user.name,user.email,encoder(user.password)],(err, results) => {
                    if (!err) {
                        query = "select user_id from user where email=?";
                        connection.query(query,[user.email],(err, results)=>{
                            if(!err){
                                sendNotification('Welcome to Library Management System', results[0].user_id)
                                return res.status(200).json("user signup successful");
                            } else {
                                return res.status(500).json(err);
                            }
                        })
                    } else {
                        return res.status(500).json(err);
                    }
                });
            }
            else {
                return res.status(409).json("User already exists");
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, res) => {
    let user = req.body;
    var query = "select user_id, email, password, role from user where email=?";
    connection.query(query,[user.email],(err,results) => {
        if(!err) {
            if (results.length > 0) {
                const bcrypt = require('bcrypt');
                bcrypt.compare(user.password, results[0].password, (err, result) => {
                    if (!err) {
                        if (result) {
                            const user = {
                                user_id: results[0].user_id,
                                email: results[0].email,
                                role: results[0].role
                              };
                            const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'8h'});
                            return res.status(200).json({token: accessToken, role: results[0].role, id: results[0].user_id});
                        } else {
                            return res.status(401).json("Password did not match")
                        }
                    } else {
                        return res.status(500).json(err);
                    }
                })
            } else {
                return res.status(404).json("User does not exists");
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get("/get-user/:id", authenticated.authenticated, (req, res)=>{
    const id = req.params.id;
    var query = "select user_id, name, email from user where user_id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch("/update-user", authenticated.authenticated, (req, res)=>{
    const user = req.body;
    var query = "update user set name=?, email=? where user_id=?";
    connection.query(query,[user.name, user.email, user.id],(err, results)=>{
        if(!err) {
            sendNotification("Your have just updated your profile.", user.id);
            return res.sendStatus(200);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post("/add-preference", authenticated.authenticated, (req, res)=>{
    const preference = req.body;
    var query = "select * from preference where user_id=? and preference=?";
    connection.query(query,[preference.user_id, preference.preference],(err, results)=>{
        if(!err) {
            if (results.length > 0) {
                return res.status(409).json("Preference already exists");
            } else {
                query = "insert into preference(user_id,preference) values(?,?)";
                connection.query(query,[preference.user_id, preference.preference],(error, results)=>{
                    if(!error) {
                        sendNotification("Your have just added a new preference.", preference.user_id);
                        return res.sendStatus(200);
                    } else {
                        return res.status(500).json(err);
                    }
                })
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get("/get-preferences/:id", authenticated.authenticated, (req, res)=>{
    const user_id = req.params.id;

    var query = "select preference from preference where user_id=?";
    connection.query(query,[user_id],(err, results)=>{
        if(!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.delete("/delete-preference/:id/:preference", authenticated.authenticated, (req, res)=>{
    const user_id = req.params.id;
    const preference = req.params.preference;
    var query = "delete from preference where user_id=? and preference=?";
    connection.query(query,[user_id,preference],(err, results)=>{
        if(!err) {
            return res.sendStatus(200);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post("/logout", (req, res)=> {
    delete res.locals;
})


module.exports = router;