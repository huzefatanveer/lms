const userModel = require('../models/user.js');
const { signJwt } = require('../middleware/authentication.js');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await userModel.findOne({ username });

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already Registered please login'
            });
        }

        const newUser = userModel(req.body);
        newUser.save();

        

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            newUser
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration'
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username,email, password } = req.body;
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(500).json({ success: false, message: 'User not found' });
        }

        const passwordMatch = await user.comparePassword(password);

        if (passwordMatch) {
            const token = signJwt(user);
            res.status(200).json({ success: true, message: 'User logged in', user: user, token });
        } else {
            res.status(500).json({ success: false, message: 'Password didn\'t match' });
        }
    } catch (error) {
        res.status(500).json({ message: 'User not found' });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById({_id:userId}); // Fetch user by ID
        if (user) {
            res.json(user);
        } else {
            console.log(res)
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred' });
    }
}

const getAllUsers= async(req,res)=>{
       
    try {
        const users = await userModel.find({})
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { registerUser, loginUser,getUser, getAllUsers };
