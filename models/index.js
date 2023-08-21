const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.boards = require("./board.model.js")(sequelize, Sequelize);
db.lists = require("./list.model.js")(sequelize, Sequelize); 
db.cards = require("./card.model.js")(sequelize, Sequelize);


db.boards.hasMany(db.lists, { as: "lists" });
db.lists.belongsTo(db.boards, {
  foreignKey: "boardId",
  as: "boards",
});


db.lists.hasMany(db.cards, { as: "cards" });
db.cards.belongsTo(db.lists, {
  foreignKey: "listId",
  as: "lists",
});

module.exports = db;