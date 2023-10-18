const jwt = require('jsonwebtoken');


// create middleware for authentication
exports.authenticate = (req, res, next) => {
    console.log("authenticate");
    // Validate request
    if(!req.headers.authorization) {
        return res.status(401).send({
            message: "Unauthorized request"
        });
    }
    let token = req.headers.authorization//.split(' ')[1];
    console.log(token);
    if (token === 'null') {
        return res.status(401).send({
            message: "Unauthorized request"
        });
    }
    // Verify token
    let payload = jwt.verify(token, 'secretkey');
    console.log(payload);
    if (!payload) {
        return res.status(401).send({
            message: "Unauthorized request"
        });
    }
    //req.userId = payload.subject;
    next();
}

