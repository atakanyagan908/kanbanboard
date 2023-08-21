module.exports = app => {
    const boards = require("../controllers/board.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", boards.create);
    router.get("/", boards.findAll);
    router.get("/:boardId/lists", boards.getAllListsByBoardId);

    router.get("/:id", boards.findOne);
    router.put("/:id", boards.update);
    router.delete("/:id", boards.delete);
    
  
    app.use('/api/boards', router);
  };