const express = require('express');
const router = express();
const nodemailer = require('nodemailer');

router.post('/contact', (req, res) => {
    try {
        var name = req.body.name;
        var message = req.body.message;
        var email = req.body.email;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'prashantkat10796@gmail.com',
                pass: 'Rekha@123'
            }
        });
        var mailOptions = {
            from: 'prashantkat10796@gmail.com',
            to: 'prashantkatiyar10796@gmail.com',
            subject: 'email from application',
            text: " name : " + name + "\n " + "message : " + message + "\n " + "email : " + email + "\n "
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                var respobj = {
                    status: "true",
                    data: info.response
                }
                return res.status(200).json(respobj);
            }
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: false,
            message: e.message
        });
    }
});

router.get('/userActivity', (req, res) => {
    console.log("hello user");
    res.send('req is comming');
})


// module.exports = router;



// ****************************************************


module.exports = router;