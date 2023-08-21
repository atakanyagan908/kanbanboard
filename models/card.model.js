module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },

      colorCode: {
        type: Sequelize.STRING
      },
      
      
      
    });
  
    return Card;
  };