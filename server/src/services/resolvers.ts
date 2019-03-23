import db from '../models';
const Op = db.Sequelize.Op;
const { Food_Nutrient_Database } = db;

const resolvers = {
  Query: {
    food({} = {}, { id }) {
      return Food_Nutrient_Database.findById(id);
    },
    allFoods({} = {}, args) {
      return Food_Nutrient_Database.findAll();
    },
    foodByName({} = {}, { name }) {
      return Food_Nutrient_Database.findAll({
        limit: 10,
        where: {
          Food_Name: {
            [Op.like]: `%${name}%`
          }
        }
      });
    }
  },
  Mutation: {
    addFood(
      {} = {},
      { name, base_amount, proteins, carbohydrates, fats, fibre }
    ) {
      return Food_Nutrient_Database.build({
        name,
        base_amount,
        proteins,
        carbohydrates,
        fats,
        fibre
      })
        .save()
        .then(food => food);
    },
    deleteFood({} = {}, { id }) {
      return Food_Nutrient_Database.findById(id).then(food => {
        return food.destroy();
      });
    },
    updateFood(
      {} = {},
      { id, name, base_amount, proteins, carbohydrates, fats, fibre }
    ) {
      return Food_Nutrient_Database.findById(id).then(food => {
        return food.update({
          name,
          base_amount,
          proteins,
          carbohydrates,
          fats,
          fibre
        });
      });
    }
  }
};

export default resolvers;
