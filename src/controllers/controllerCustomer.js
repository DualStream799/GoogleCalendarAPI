'use strict';

const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/repositoryCustomer');
const emailService = require('../services/serviceEmail');
const md5 = require('md5');

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLength(req.body.name, 3, "Title must be longer than 3 characters");
    contract.isEmail(req.body.email, "Invalid email");
    contract.hasMinLength(req.body.password, 6, "Description must be longer than 6 characters");

    // Check if the data is valid:
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password) // + global.SALT_KEY
        });

        emailService.send(req.body.email, "Sending with SendGrid is Fun", global.EMAIL_TEMPLATE.replace('{0}', req.body.name));

        res.status(201).send({message: 'Client saved successfully'});
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}
