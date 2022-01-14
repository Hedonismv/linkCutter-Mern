const {Router, json, response} = require('express')
const User = require('../models/User')
const router = Router()
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

// /api/auth/register
router.post('/register',
    [
        check('email', 'Wrong E-mail').isEmail(),
        check('password', 'Min password length is 6 symbols')
            .isLength({min:6})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong registration data'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})
        if(candidate){
            return  res.status(400).json({message: 'This user is already created'})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(200).json({message: 'User created'})

    }catch (e) {
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})

// /api/auth/login
router.post('/login',
    [
        check('email', 'Enter valid e-mail').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong login data'
            })
        }
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: 'User was not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: 'Wrong password, try again'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        return res.json({token, userId: user.id})

    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong, try again.'})
    }
})




module.exports = router
