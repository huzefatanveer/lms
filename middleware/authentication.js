const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.js');

const signJwt = (user) => {
    let token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '5d'
        }
    );
    return token;
};

const decodeJwt = (req, res, next) => {
    let token;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decode;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: 'failed', message: 'Unauthorized User' });
        }
    } else {
        res.status(401).send({ status: 'failed', message: 'Unauthorized User, no token' });
    }
};

let verifyTokenExiry = (req, res) => {
    let token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ "Success": false, "Message": "No token provided" });
    }
    else {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ "Success": false, "Message": "Invalid token" });

            }
            else {
                res.status(200).json({ "Success": true, "Message": "Token is valid" });
            }
        });
    }
}

let extractUser = (user) => {
    let keys = ['_id', 'username'];
    let newUser = {};
    for (let i = 0; i < keys.length; i++) {
        newUser[keys[i]] = user[keys[i]];
    }
    return newUser;
};

module.exports = {
    signJwt,
    decodeJwt,
    extractUser,
    verifyTokenExiry
};
