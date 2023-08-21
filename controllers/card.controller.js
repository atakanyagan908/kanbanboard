const db = require("../models");
const Card = db.cards;
const Op = db.Sequelize.Op;
const errorMessages = require('../messages/errorMessages');

const { body, validationResult } = require('express-validator');

exports.create = [
    
     body('title').notEmpty().withMessage(errorMessages.fieldNotEmpty),

     body('listId').notEmpty().withMessage(errorMessages.fieldNotEmpty),


     
  
    
    (req, res) => {
        
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }

   
    const card = {
        title: req.body.title,
        description: req.body.description,
        listId : req.body.listId,
        colorCode : req.body.colorCode
        
    };

    Card.create(card)
    .then(data => {

        createdCardId = data.id;

        const links = [
            
          { rel: 'update', href: `/api/cards/${createdCardId}`,type: 'PUT' },

          { rel: 'delete', href: `/api/cards/${createdCardId}`,type: 'DELETE' },

          { rel: 'self', href: `/api/cards/${createdCardId}`,type: 'GET' },



          ];

          const response = {
            data,
            links
          }
      
        res.setHeader('Content-Type', 'application/json');
      
        res.status(201).send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Card."
      });
    });
}];

exports.findAll = (req, res) => {
    
    Card.findAll()
      .then(data => {

        
        res.setHeader('Content-Type', 'application/json');
        
        res.setHeader('Cache-Control', 'no-cache'); 

        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Card.findByPk(id)
      .then(data => {
        if (data) {
            
        res.setHeader('Content-Type', 'application/json');
        
        res.setHeader('Cache-Control', 'no-cache'); 

        res.status(200).send(data);

        } else {
          res.status(404).send({
            message: `Cannot find  with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving  with id=" + id
        });
      });
  };

exports.update = [
    
    body('title').notEmpty().withMessage(errorMessages.fieldNotEmpty),

    body('listId').notEmpty().withMessage(errorMessages.fieldNotEmpty),
    
    (req, res) => {
    const id = req.params.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
  
    Card.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(204).send({
            message: " was updated successfully."
          });
        } else {
          res.status(404).send({
            message: `Cannot update  with id=${id}. Maybe  was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating  with id=" + id
        });
      });
  }];

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Card.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(204).send({
            message: " was deleted successfully!"
          });
        } else {
          res.status(404).send({
            message: `Cannot delete  with id=${id}. Maybe  was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete  with id=" + id
        });
      });
};

  