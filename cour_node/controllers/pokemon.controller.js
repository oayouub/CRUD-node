const PKM = require('../models/pokemonModel.js');

//Create and save a new Pkm
exports.create = (req, res) => {
    console.log("create");
    console.log(req.body);
    const postPkm = req.body;

    const pkm = new PKM({
        name: postPkm.name,
        type: postPkm.type,
        level: postPkm.level
    });
    pkm.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    };

// Retrieve and return all pkm from the database.
exports.findAll = (req, res) => {
    console.log("findAll");
    PKM.find()
        .then(pkm => {
            res.send(pkm);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
    };

// Find a single pkm with a pkmid
exports.findOne = (req, res) => {
    PKM.findById(req.params.pkmid)
        .then(pkm => {
            if (!pkm) {
                return res.status(404).send({
                    message: "Pkm not found with id " + req.params.pkmid
                });
            }
            res.send(pkm);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pkm not found with id " + req.params.pkmid
                });
            }
            return res.status(500).send({
                message: "Error retrieving pkm with id " + req.params.pkmid
            });
        });
    }

// Update a pkm identified by the pkmid in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Pkm name can not be empty"
        });
    }

    // Find pkm and update it with the request body
    PKM.findByIdAndUpdate(req.params.pkmid, {
        name: req.body.name,
        type: req.body.type,
        level: req.body.level
    }, { new: true })
        .then(pkm => {
            if (!pkm) {
                return res.status(404).send({
                    message: "Pkm not found with id " + req.params.pkmid
                });
            }
            res.send(pkm);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pkm not found with id " + req.params.pkmid
                });
            }
            return res.status(500).send({
                message: "Error updating pkm with id " + req.params.pkmid
            });
        });
    };

// Delete a pkm with the specified pkmid in the request
exports.delete = (req, res) => {
    PKM.findByIdAndRemove(req.params.pkmid)
        .then(pkm => {
            if (!pkm) {
                return res.status(404).send({
                    message: "Pkm not found with id " + req.params.pkmid
                });
            }
            res.send({ message: "Pkm deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Pkm not found with id " + req.params.pkmid
                });
            }
            return res.status(500).send({
                message: "Could not delete pkm with id " + req.params.pkmid
            });
        });
    };
