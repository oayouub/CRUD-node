const USER = require('../../models/userModels/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create and save a new User with an unique username
exports.create = (req, res) => {
    console.log("create");
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "User username can not be empty"
        });
    }
    // Create a User
    const user = new USER({
        username: req.body.username,
        password: req.body.password
    });
    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            if (err.code === 11000) {
                res.status(500).send({
                    message: "Username already exists"
                });
            } else {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                });
            }
        });
    };


// Login and generate JWT token
exports.login = (req, res) => {
    console.log("login");
    // Validate request
    if(!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Username and password are required"
        });
    }
    // Find user by username
    USER.findOne({username: req.body.username})
        .then(user => {
            if(!user) {
                return res.status(401).send({
                    message: "Invalid username or password"
                });
            }
            // Check if password matches
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).send({
                    message: "Invalid username or password"
                });
            }
            // Generate JWT token
            const token = jwt.sign({id: user._id}, 'secretkey', {expiresIn: '1h'});
            res.send({auth: true, token: token});
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};
    

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    console.log("findAll");
    USER.find()
        .then(user => {
            res.send(user);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    };

