// The updated code you provided is more secure than the previous version.
//  It uses environment variables to store sensitive information like the email address and password,
//   which is a good practice. It also validates the user input and uses HTTPS to encrypt the communication between
//    the client and the server, which are important security measures.

// However, there are still a few things you can do to make the code even more secure:

// 1 - Use a secure email provider: While using Gmail is convenient,
//  it is not the most secure email provider. Consider using a more secure email provider that offers 
//  end-to-end encryption or other security features.

// 2- Add rate limiting: You may want to consider adding rate limiting
//  to your server to prevent attackers from sending a large number of emails in a short period of time.
//   This can help protect against Denial of Service (DoS) attacks.

// Add input validation: While you are already using express.json()
//  to parse the JSON body of the HTTP request, it is a good practice to 
//  also validate the user input to ensure that it is safe and does not contain any malicious content.
//   You can use a validation library like Joi to validate the user input before sending the email.

// Use a session key for each communication: While you are already
//  using a unique session key for each communication, it is important
//   to ensure that the session key is generated using a secure random number generator.


const dotenv = require("dotenv");
const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const crypto = require('crypto');

dotenv.config()
const app = express();

console.log(process.env.PORT);

const password = process.env.PASSWORD;
const Email = process.env.EMAIL;
const sessionKeyLength = 32;

console.log(password);
console.log(Email);

PORT = process.env.PORT;



const limiter = rateLimit({
    windowMs: 15 *60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'You Have Sent Many Requests, please try again later'
  });


app.use(express.static('public'));
app.use(express.json());
app.use(limiter); // Apply rate limiter middleware to all routes



// Subscribe Form
const schema2 = Joi.object({
  email2: Joi.string().email().required().messages({
    'string.empty': 'Please enter your email address',
    'string.email': 'Please enter a valid email address'
  })
});

// Route for subscribing
app.post('/subscribe', (req, res) => {
 
  // Validate the request body using theJoi schema
  const { error, value } = schema2.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send('Bad Request');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: Email,
      pass: password
    }
  });

  const mailOptions = {
    from: Email,
    to: req.body.email2,
    subject: 'Thanks for subscribing!',
    text: `Thanks for subscribing to our newsletter, ${req.body.email2}!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent' + info.response);
      res.status(200).send('OK');
    }
  });

});

// Booking Form

const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Please enter your name'
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Please enter your email address',
      'string.email': 'Please enter a valid email address'
    }),
    phone: Joi.string().pattern(/^\d{11}$/).messages({
      'string.pattern.base': 'Please enter a valid 11-digit phone number'
    }),
    address: Joi.string().required().messages({
      'string.empty': 'Please enter your address'
    }),
    message: Joi.string().required().messages({
      'string.empty': 'Please enter your message'
    }),
    branch: Joi.string().valid('thawra', 'hegaz', 'hurghada').required().messages({
      'any.only': 'Please select a valid branch'
    }),
    service: Joi.string().valid('clinics', 'investigations', 'operations').required().messages({
      'any.only': 'Please select a valid service'
    })
  });

app.get('/' , (req, res) =>{
    res.sendFile(__dirname + './public/index.html');
});

app.post('/', (req, res)=>{
  console.log(req.body.email);
    console.log(req.body);

      // Validate the request body using the Joi schema
  const { error, value } = schema.validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send('Bad Request');
  }


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:Email,
            pass:password
        }
    })

    const mailOptions = {
        from: req.body.email,
        to:Email,
        subject: `Message From ${req.body.email}`,
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}
        \nBranch: ${req.body.branch}\nService: ${req.body.service}\n\nMessage: ${req.body.message}`,
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.status(500).send('Internal Server Error');
        }else{
            console.log('Email sent' + info.response);
            res.status(200).send('OK');
        }
    })
    })

    app.listen(PORT , ()=>{
        console.log(`server Running on port ${PORT}`);
})