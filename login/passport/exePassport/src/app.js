import express from 'express';
import session from 'express-session';
import mongoose from "mongoose";
import mongoStore from 'connect-mongo';
import passport from 'passport';

import userRouter from './routes/userRouter.js';
import __dirname from './utils/constantsUtil.js';
import initializatePassport from './config/passportConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/users', userRouter);

const uri = 'mongodb+srv://ronin:r0nin7_rules@cluster0.liik0i2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri);

//Session
app.use(session(
    {
        store: mongoStore.create({
            mongoUrl: uri,
            ttl: 100
        }),
        secret: 'secretPhrase',
        resave: false,
        saveUninitialized: false
    }
));

initializatePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/sessions', userRouter);

const PORT = 8088;
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});