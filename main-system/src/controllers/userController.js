const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    getUserProfile: async (req, res) => {
        const token = req.cookies.accessToken;
        const username = jwt.decode(token).username;
        try {
            const user = await User.findOne({
                where: {
                    Username: username,
                }
            });

            const { PasswordHash, ...info } = user.dataValues;
            const createdAt = new Date(info.DateCreated);
            const date = createdAt.getDate();
            const month = createdAt.getMonth() + 1;
            const year = createdAt.getFullYear();
            const dateString = `${date}/${month}/${year}`;
            info.DateCreated = dateString;

            const DOB = new Date(info.DateOfBirth);
            const DOBDate = DOB.getDate();
            const DOBMonth = DOB.getMonth() + 1;
            const DOBYear = DOB.getFullYear();
            const DOBDateString = `${DOBDate}/${DOBMonth}/${DOBYear}`;
            info.DateOfBirth = DOBDateString;

            return res.render("profile", {
                isLoggedIn: !!token,
                username: username,
                user: info,
            })
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    getEditProfile: async (req, res) => {
        const token = req.cookies.accessToken;
        const username = jwt.decode(token).username;
        try {
            const user = await User.findOne({
                where: {
                    Username: username,
                }
            });

            const { PasswordHash, ...info } = user.dataValues;
            const createdAt = new Date(info.DateCreated);
            const date = createdAt.getDate();
            const month = createdAt.getMonth() + 1;
            const year = createdAt.getFullYear();
            const dateString = `${date}/${month}/${year}`;
            info.DateCreated = dateString;

            const DOB = new Date(info.DateOfBirth);
            const DOBDate = DOB.getDate();
            const DOBMonth = DOB.getMonth() + 1;
            const DOBYear = DOB.getFullYear();
            const DOBDateString = `${DOBMonth}/${DOBDate}/${DOBYear}`;
            info.DateOfBirth = DOBDateString;

            console.log(info.DateOfBirth);  
            return res.render("profile-edit", {
                isLoggedIn: !!token,
                username: username,
                user: info,
            })
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    postEditProfile: async (req, res) => {
        const token = req.cookies.accessToken;
        const username = jwt.decode(token).username;

        const { fullName, email, phoneNumber, address, dateOfBirth, gender } = req.body;

        const existingUser = await User.findOne({
            where: {
                Email: email,
                Username: {
                    [Op.ne]: username,
                },
            }
        });

        console.log(existingUser);

        if (existingUser) {
            return res.status(400).json({ responseText: 'Email đã tồn tại.' });
        }

        const currentDate = new Date();
        const userDateOfBirth = new Date(dateOfBirth);

        if (userDateOfBirth >= currentDate) {
            return res.status(400).json({ responseText: 'Ngày sinh không hợp lệ' });
        }

        // Update user profile
        const user = await User.findOne({
            where: {
                Username: username,
            }
        });

        user.FullName = fullName;
        user.Email = email;
        user.PhoneNumber = phoneNumber;
        user.Address = address;
        user.DateOfBirth = userDateOfBirth;
        user.Gender = gender;

        await user.save();

        return res.redirect("/user/profile");
    },
}

module.exports = userController;