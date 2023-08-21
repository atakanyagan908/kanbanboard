const db = require("../models");
const Board = db.boards;
const List = db.lists;
const Op = db.Sequelize.Op;



const errorMessages = require('../messages/errorMessages');
const { body, validationResult } = require('express-validator');
const { response } = require("express");



exports.create = [
    
    body('title').notEmpty().withMessage(errorMessages.fieldNotEmpty),

    (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description } = req.body;
        const board = {
            title: title,
            description: description,
        };
        

         Board.create(board).then(data => {

          const createdBoardId = data.id;

          console.log(createdBoardId)

          const links = [
            
            { rel: 'update', href: `/api/boards/${createdBoardId}`,type: 'PUT' },

            { rel: 'delete', href: `/api/boards/${createdBoardId}`,type: 'DELETE' },

            { rel: 'self', href: `/api/boards/${createdBoardId}`,type: 'GET' },



            ];

            const response = {
              data,
              links
            }
            res.setHeader('Content-Type', 'application/json');       
            res.status(201).send(response);
                }).catch(err => {
                           res.status(500).send({
                          message:
                               err.message || "Some error occurred while creating the Board."
                          });
                        });      
    }
];

exports.findAll = (req, res) => {
    
    Board.findAll()
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

  //id si 1 olan board da ki tüm kayıtları getir.

  exports.getAllListsByBoardId = (req, res) => {
    
    List.findAll()
      .then(data => {

        const result = [];

        _boardId = req.params.boardId
        console.log("_boardId")
        console.log(_boardId)

        data.forEach(item => {
          const boardId = item.dataValues.boardId;
          console.log('boardId')
          console.log(boardId)
          if (_boardId == boardId) {
            result.push(item)
          }
        })
        console.log('result')
        console.log(result)

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
  
    Board.findByPk(id)
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
  
  (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const id = req.params.id;
  
    Board.update(req.body, {
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
  
    Board.destroy({
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

