'use strict';
export default (sequelize, DataTypes) => {
  var Food = sequelize.define(
    'Food_Nutrient_Database',
    {
      Food_Name: DataTypes.STRING,
      Energy_without_dietary_fibre: DataTypes.STRING,
      Protein: DataTypes.STRING,
      Total_Fat: DataTypes.STRING,
      Total_dietary_fibre: DataTypes.STRING,
      Total_sugars: DataTypes.STRING,
      Added_sugars: DataTypes.STRING,
      Available_carbohydrate_with_sugar_alcohols: DataTypes.STRING
    },
    {
      freezeTableName: true,

      // define the table's name
      tableName: 'Food_Nutrient_Database'
    }
  );
  Food.associate = function(models) {
    // associations can be defined here
  };
  return Food;
};
