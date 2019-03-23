import { gql } from 'apollo-server';

const typeDefs = gql`
  type Food {
    Food_Name: String
    Energy_without_dietary_fibre: String
    Protein: String
    Total_Fat: String
    Total_dietary_fibre: String
    Total_sugars: String
    Added_sugars: String
    Available_carbohydrate_with_sugar_alcohols: String
  }

  type Meal {
    name: String
    foodAmount: Float
    mealDate: String
    food: Food
  }

  type Query {
    # Food
    food(id: ID): Food
    allFoods: [Food]
    foodByName(name: String): [Food]
    allMeals: [Meal]
  }

  type Mutation {
    # Food
    addFood(
      name: String
      base_amount: Float
      proteins: Float
      carbohydrates: Float
      fats: Float
      fibre: Float
    ): Food
    deleteFood(id: ID): Food
    updateFood(
      id: ID
      name: String
      base_amount: Float
      proteins: Float
      carbohydrates: Float
      fats: Float
      fibre: Float
    ): Food

    addMeal(
      name: String
      foodAmount: Float
      foodId: Int
      mealDate: String
    ): Meal
  }
`;

export default typeDefs;
