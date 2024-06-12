const express = require('express')
const router = express.Router()
const user = require('../models/user')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecret = "mynameismonkeydluffy"

router.post("/createuser", [
    body('email', 'Invalid email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect password').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)
    try {
        await user.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true })
    } catch (error) {
        console.log(err);
        res.json({ success: false })
    }
})


router.post("/loginuser", [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email

    try {
        let userdata = await user.findOne({ email })
        if (!userdata) {
            return res.status(400).json({ errors: "try logging with current credentials" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userdata.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "try logging with current credentials" });
        }

        const data = {
            user: {
                id:userdata.id
            }
        }

        authToken = jwt.sign(data,jwtSecret)
        return res.json({ success: true ,authToken:authToken});

    } catch (error) {
        console.log(err);
        res.json({ success: false })
    }
})



module.exports = router;