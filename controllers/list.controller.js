const db = require("../models");
const List = db.lists;
const Card = db.cards;

const Op = db.Sequelize.Op;
const { body, validationResult } = require('express-validator');
const errorMessages = require('../messages/errorMessages');

exports.create = [
    
    body('title').notEmpty().withMessage(errorMessages.fieldNotEmpty),
    
    body('boardId').notEmpty().withMessage(errorMessages.fieldNotEmpty),

    (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
    }   

    const list = {
        title: req.body.title,
        boardId: req.body.boardId,
             
    };

    List.create(list)
    .then(data => {

      const createdListId = data.id;

      const links = [
            
        { rel: 'update', href: `/api/lists/${createdListId}`,type: 'PUT' },

        { rel: 'delete', href: `/api/lists/${createdListId}`,type: 'DELETE' },

        { rel: 'self', href: `/api/lists/${createdListId}`,type: 'GET' },



        ];

        const response = {
          data,
          links
        }

      res.status(201).send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the list."
      });
    });
}];

exports.findAll = (req, res) => {
    
    List.findAll()
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

  exports.getAllCardsByListId = (req, res) => {
    
    Card.findAll()
      .then(data => {

        const result = [];

        _listId = req.params.listId
        

        data.forEach(item => {
          const listId = item.dataValues.listId;
          
          if (_listId == listId) {
            result.push(item)
          }
        })
        

        res.setHeader('Content-Type', 'application/json');
        
        res.setHeader('Cache-Control', 'no-cache'); 

        res.status(200).send(result);
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
  
    List.findByPk(id)
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
    
    body('boardId').notEmpty().withMessage(errorMessages.fieldNotEmpty),

    (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
    } 

    const id = req.params.id;
  
    List.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(204).send({
            message: " was updated successfully."
          });
        } else {
          res.send({
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
  
    List.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(204).send({
            message: " was deleted successfully!"
          });
        } else {
          res.send({
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
