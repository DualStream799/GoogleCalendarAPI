'use strict';

const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/repositoryOrder');
const guid = require('guid');

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}

exports.post = async(req, res, next) => {

    try {
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({ message: "Order saved successfully" });
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}