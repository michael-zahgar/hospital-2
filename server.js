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
const cors = require('cors');


dotenv.config()
const app = express();

// console.log(process.env.PORT);

const password = process.env.PASSWORD;
const Email = process.env.EMAIL;
const sessionKeyLength = 32;

console.log(password);
console.log(Email);

PORT = process.env.PORT;



const limiter = rateLimit({
    windowMs: 15 *60 * 1000, // 15 minutes
    max: 10, // limit each IP to 5 requests per windowMs
    message: 'You Have Sent Many Requests, please try again later'
  });


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(limiter); // Apply rate limiter middleware to all routes
app.use(cors())

 app.get('/' , (req, res) =>{
   res.sendFile(__dirname + './en/index.html');
});

// Subscribe Form

// Route for subscribing
app.post('/subscribe', (req, res) => {
  let email2 = req.body.email2;
  console.log(email2);
  // Validate the request body using theJoi schema
  const schema2 = Joi.object({
    email2: Joi.string().email().required().messages({
      'string.empty': 'Please enter your email address || برجاء ادخال الايميل الخاص بك',
      'string.email': 'Please enter a valid email address || يرجى إدخال  البريد إلكتروني صحيح'
    })
  });



  const { error, value } = schema2.validate(req.body);

  if(error){
    const errorDetails = error.details.map(d => d.message).join('<br>');
    res.send(`<h2>Validation Error : </h2> ${errorDetails}`)
    return;
  }

  //     res.send(`
  // <div style="text-align:center;">
  //   <h2 style="padding-top:4rem">Form Submitted Successfuly</h2>
  //   <a href="./en/index.html" style="text-decoration:none; margin-top:1rem;">
  // Back To Home Page || الرجوع للصفحة الرئيسية</a>
  // </div>
  // `)
   res.redirect('./en/index.html')

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

app.post('/submitForm', (req, res)=>{

  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let address = req.body.address;
  let message = req.body.message;
  let branch = req.body.branch;
  let service = req.body.service;

console.log(name , email , phone , address , message , branch , service)


const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Please enter your name'
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Please enter your email address || الرجاء إدخال عنوان البريد الإلكتروني الخاص بك',
      'string.email': 'Please enter a valid email address || يرجى إدخال البريد إلكتروني صحيح'
    }),
    phone: Joi.string().pattern(/^\d{11}$/).messages({
      'string.pattern.base': 'Please enter a valid 11-digit phone number || يرجى إدخال رقم هاتف صحيح مكون من 11 رقما'
    }),
    address: Joi.string().required().messages({
      'string.empty': 'Please enter your address || الرجاء إدخال عنوانك'
    }),
    message: Joi.string().required().messages({
      'string.empty': 'Please enter your message || الرجاء إدخال رسالتك'
    }),
    branch: Joi.string().valid('thawra', 'hegaz', 'hurghada').required().messages({
      'any.only': 'Please select a valid branch || يرجى اختيار فرع '
    }),
    service: Joi.string().valid('clinics', 'investigations', 'operations').required().messages({
      'any.only': 'Please select a valid service || يرجى اختيار خدمة'
    })
  });


      // Validate the request body using the Joi schema
  const { error, value } = schema.validate(req.body);

  if(error){
    const errorDetails = error.details.map(d => d.message).join('<br>');
    res.send(`<h2>Validation Error : </h2> ${errorDetails}`)
    return;
  }

  // res.send(`
  // <div class="container" style="text-align: center; padding-top:4rem ">
  //   <h2>Form Submitted Successfuly || تم ارسال الطلب بنجاح</h2>
  // <a href="./en/index.html" style="text-decoration:none; margin-top:1rem;">
  // Back To Home Page || الرجوع للصفحة الرئيسية</a>
  // </div>
  // `);
  res.redirect('./en/index.html')
  name = '';
  email = '';
  phone = '';
  address = '';
  message = '';
  branch = '';
  service = '';



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

// Contact Form

app.post('/contact', (req, res) => {

  let contactName = req.body.contactName;
  let contactEmail = req.body.contactEmail;
  let contactPhone = req.body.contactPhone;
  let contactSubject = req.body.contactSubject;
  let contactMessage = req.body.contactMessage;

  console.log(contactName ,contactEmail ,  contactPhone ,contactSubject ,  contactMessage)

const contactSchema = Joi.object({
  contactName: Joi.string().trim().required().messages({
    'any.required': 'Please enter your name || برجاء ادخال الاسم'
  }),
  contactEmail: Joi.string().trim().email({ minDomainSegments: 2 }).required().messages({
    'any.required': 'Please enter a valid email address || برجاء ادخال البريد الالكتروني صحيح'
  }),
  contactPhone: Joi.string().trim().length(11).pattern(/^\d+$/).required().messages({
    'any.required': 'Please enter a valid 11-digit phone number || يرجى إدخال رقم هاتف صحيح مكون من ١١ رقما'
  }),
  contactSubject: Joi.string().trim().required(),

  contactMessage: Joi.string().trim().required(),
});

  const { error, value } = contactSchema.validate(req.body);
  if(error){
    const errorDetails = error.details.map(d => d.message).join('<br>');
    res.send(`<h2>Validation Error : </h2> ${errorDetails}`)
    return;
  }
  // Extract the form data from the request body
  const formData = value;
  //   res.send(`
  // <div class="container" style="text-align: center; padding-top:4rem ">
  //   <h2>Form Submitted Successfuly || تم ارسال الطلب بنجاح</h2>
  // <a href="./en/index.html" style="text-decoration:none; margin-top:1rem;">
  // Back To Home Page || الرجوع للصفحة الرئيسية</a>
  // </div>
  // `);

    res.redirect('./en/index.html')
  // Create a nodemailer transporter object with your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:Email,
      pass:password
    }
  });

  // Set up the email message options
  const mailOptions = {
    from: formData.contactEmail,
    to:Email,
    subject: formData.contactSubject,
    text: formData.contactMessage + '\n\n' + 'From: ' + formData.contactFullName + '\n' + 'Email: ' + formData.contactEmail + '\n' + 'Phone: ' + formData.contactPhone
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Something went wrong. Please try again later.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('OK');
    }
  });
});




    app.listen(PORT , ()=>{
        // console.log(`server Running on port ${PORT}`);
})