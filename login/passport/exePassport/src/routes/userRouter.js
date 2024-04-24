import {Router} from 'express';
import passport from 'passport';

const router = Router();

router.get("/", (req, res) => {
    res.send({
        status: "success",
        message: "Welcome to the LoginApp!"
    });
});

router.post(
    "/register",
    passport.authenticate("register", { failureRedirect: "/api/sessions/failRegister" }),
    (req, res) => {
        res.send({
            status: 'success',
            message: 'User registered'
        });
    }
);

router.get("/failRegister", (req, res) => {
    res.status(400).send({
        status: "error",
        message: "Failed Register"
    });
});

router.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/api/sessions/failLogin" }),
    (req, res) => {
        if (!req.user) {
            return res.send(401).send({
                status: "error",
                message: "Error Login!"
            });
        }

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age
        }

        res.send({
            status: 'success',
            payload: req.user
        });
    }
);

router.get("/failLogin", (req, res) => {
    res.status(400).send({
        status: "error",
        message: "Failed Login"
    });
});

export default router;