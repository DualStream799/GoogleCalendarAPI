'use strict';

var sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.send = async(to, subject, body) => {
    sgMail.send({
        to: to, 
        from: 'dualstream799@gmail.com', 
        subject: subject,
        html: body
        });
}

  
