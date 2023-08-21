module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("list", {
      title: {
        type: Sequelize.STRING
      },
      
      
      
    });
  
    return List;
  };