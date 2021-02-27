const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const Joi = require('@hapi/joi');
const nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());

app.post('/enroll', (req, res) => {
  try {
    var name = req.body.name;
    var message = req.body.message;
    var email = req.body.email;
    var nodemailer = require('nodemailer');

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
      }
    });
    // return res.status(200).json(result);






    // database.connection.getConnection((err, connection) => {
    //     if (err) {
    //         if (connection) {
    //             connection.release();
    //             connection, destroy();
    //         }
    //         res.status(500).json({
    //             status: false,
    //             message: err.message
    //         });
    //     }
    //     var insertQuery = `insert into customer(name,message,email,) VALUES('${name}','${message}','${email}');`
    //     connection.query(insertQuery, (error, rows, fields) => {
    //         console.log("query ", insertQuery)
    //         if (error) {
    //             if (connection) {
    //                 connection.release();
    //                 connection.destroy();
    //             }
    //             if (error.code == 'ER_DUP_ENTRY') {
    //                 resObj = {
    //                     status: false,
    //                     message: "User already exists."
    //                 }
    //                 return res.status(200).json(resObj);
    //             }
    //             return res.status(500).json({
    //                 status: false,
    //                 message: error.message
    //             });
    //         }
    //         const result = {
    //             status: true,
    //             message: "applyed Successfully.",
    //             response: req.body
    //         }
    //         if (connection) {
    //             connection.release();
    //             connection.destroy();
    //         }
    //         var transporter = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 user: 'prashantkat10796@gmail.com',
    //                 pass: 'Rekha@123'
    //             }
    //         });

    //         var mailOptions = {
    //             from: 'prashantkat10796@gmail.com',
    //             to: 'prashantkatiyar10796@gmail.com',
    //             subject: 'email from application',
    //             text: " name : " + name + "\n " + "message : " + message + "\n " + "email : " + email + "\n "
    //         };

    //         transporter.sendMail(mailOptions, function(error, info) {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 console.log('Email sent: ' + info.response);
    //             }
    //         });
    //         return res.status(200).json(result);
    //     });
    // });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: false,
      message: e.message
    });
  }
});


// app.get('/', (req, res) => {
//     res.send('Welcome to asdadasdasdasdasdada!!');
// })

app.use('/', express.static(path.join(__dirname, 'www')));
app.use((req, res, next) => {
  console.log(req.path)
  res.sendFile(path.join(__dirname, '/www/index.html'));
})

app.use((req, res, next) => {
  console.log(req.path);
  res.status(404).send('<h1>Page not found</h1>');
})


const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));