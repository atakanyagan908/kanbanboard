module.exports = app => {
    const lists = require("../controllers/list.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", lists.create);
    router.get("/", lists.findAll);
    router.get("/:listId/cards", lists.getAllCardsByListId);

    router.get("/:id", lists.findOne);
    router.put("/:id", lists.update);
    router.delete("/:id", lists.delete);
    
  
    app.use('/api/lists', router);
  };