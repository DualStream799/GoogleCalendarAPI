'use strict';

const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repositories/repositoryProduct');

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLength(req.body.title, 3, "Title must be longer than 3 characters");
    contract.hasMinLength(req.body.slug, 3, "Slug must be longer than 3 characters");
    contract.hasMinLength(req.body.description, 3, "Description must be longer than 3 characters");

    // Check if the data is valid:
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create(req.body);
        res.status(201).send({ message: "Product saved successfully" });
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: "Product updated successfully" });
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(200).send({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: "Failed to process request" });
    }
}
