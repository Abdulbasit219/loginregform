const express = require('express');
const app = express();
const Data = require('./data');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const middleware = require('./Auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: ["https://loginregformfrontend.vercel.app"],
    methods: ["Get", "Post", "PUT", "DELETE"],
    credentials: true 
}))

app.use(cookieParser());
app.use(express.json());

dotenv.config({ path: './config.env' })

const port = process.env.PORT;
require('./connection')


app.get('/', (req, res) => {
    res.send("ApI Is working");
})


// about us page route
app.get('/about', middleware, (req, res) => {
    res.send(req.rootUser);
})



// registeration route
app.post('/register', async (req, res) => {
    const { name, email, password, cpassword } = req.body
    try {
        //check if the user is already registered
        const userExists = await Data.findOne({ email: email });

        if (userExists) {
            res.status(422).send('User already exists With this email address');
        }

        // check if user filled all the fields
        else if (!name || !email || !password || !cpassword) {
            res.status(400).send('All fields are required');
        }

        //check pass and confirm password 
        else if(password !== cpassword) {
            res.status(404).send('Passwords do not match');
        }

        // save the user data into the database
        else {
            const add = new Data(req.body);
            const insert = await add.save();
            return res.status(200).send(insert);
        }

    } catch (e) {
        console.log(e);
        res.status(500).send('Internal Server Error');
    }
})



// login routes
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if email and password is not empty
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //find email in database
        const userLogin = await Data.findOne({ email: email });

        //if email find then check password is match or not
        if (userLogin) {
            const PassMatch = await bcrypt.compare(password, userLogin.password);

            if(PassMatch) {
            const jwtoken = await userLogin.generateAuthToken();

            res.cookie("token", jwtoken, {
                maxAge: 3600000,
                httpOnly: true
            })

            return res.status(200).json({ message: "User LoggedIn Successfully" });
        }
            //if not match the password
            else if (!PassMatch) {
                return res.status(400).json({ message: 'Invalid Credientials' });
            }

            //if Password is successfully match
            else {
                return res.status(200).json({ message: "User LoggedIn Successfully" });
            }
        }

        //if email not found 
        else {
            res.status(404).json({ message: 'Invalid Credientials' });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error catch" });
    }
})

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
})