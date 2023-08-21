const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Kanban Board application." });
});

const PORT = process.env.PORT || 8080;

         
require("./routes/board.routes")(app);
require("./routes/list.routes")(app);
require("./routes/card.routes")(app);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});