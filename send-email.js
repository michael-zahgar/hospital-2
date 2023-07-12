var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'watanyhospitals@gmail.com',
    pass: 'kjtvslawntqwnoie'
  }
});

var mailOptions = {
  from: 'watanyhospitals@gmail.com',
  to: 'michaelzahgar@gmail.com',
  subject: 'Booking',
  text: `Thanks For Booking We will Contact You Soon`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});