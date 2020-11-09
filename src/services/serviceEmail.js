'use strict';

var config = require('../config');
var sgMail = require('@sendgrid/mail')

sgMail.setApiKey(config.sendgridKey);

exports.send = async(to, subject, body) => {
    sgMail.send({
        to: to, 
        from: 'dualstream799@gmail.com', 
        subject: subject,
        html: body
        });
}

  
