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

const password = process.env.PASSWORDServ;
const Email = process.env.EmailServ;
const outlookBook = process.env.OutLookBook;
const sessionKeyLength = 32;

console.log(password);
console.log(Email);

PORT = process.env.PORT || 5000;



const limiter = rateLimit({
    windowMs: 15 *60 * 1000, // 15 minutes
    max: 20, // limit each IP to 5 requests per windowMs
    message: 'You Have Sent Many Requests, please try again later ||  برجاء المحاولة في وقت لاحق'
  });


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(limiter); // Apply rate limiter middleware to all routes
app.use(cors())

 app.get('/' , (req, res) =>{
   res.sendFile(__dirname + './index.html');
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

res.send(`
  <script>
    alert('Thank you for subscribing! || شكرا لك على الاشتراك! ');
     window.location.href = document.referrer;
  </script>
`);

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

res.send(`
  <script>
    alert('Thank you for contacting Watany Eye Hospitals We have received your booking request and will contact you as soon as possible to confirm your booking || شكرا لتواصلكم مع مستشفيات الوطني للعيون لقد تلقينا طلب الحجز الخاص بكم وسوف نتواصل معكم لتأكيد الحجز في أسرع وقت ممكن ');
     window.location.href = document.referrer;
  </script>
`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:Email,
            pass:password
        }
    })

    const mailOptions = {
        from: req.body.email,
        to:outlookBook,
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

res.send(`
  <script>
    alert('Thank you for contacting us here at Watany Eye Hospitals. We will be in touch soon. We look forward to serving you. || شكرا لتواصلكم معنا في مستشفيات الوطني للعيون، سوف نعاود الاتصال بكم في أسرع وقت ممكن');
     window.location.href = document.referrer;
  </script>
`);

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
    to:outlookBook,
    subject: formData.contactSubject,
    text: formData.contactMessage + '\n\n' + 'From: ' + formData.contactName + '\n' + 'Email: ' + formData.contactEmail + '\n' + 'Phone: ' + formData.contactPhone
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