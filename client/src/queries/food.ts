import gql from 'graphql-tag';

export const addFood = gql`
  mutation AddFood(
    $name: String
    $base_amount: Float
    $proteins: Float
    $carbohydrates: Float
    $fats: Float
    $fibre: Float
  ) {
    addFood(
      name: $name
      base_amount: $base_amount
      proteins: $proteins
      carbohydrates: $carbohydrates
      fats: $fats
      fibre: $fibre
    ) {
      id
      name
    }
  }
`;

export const deleteFood = gql`
  mutation DeleteFood($id: ID) {
    deleteFood(id: $id) {
      id
    }
  }
`;

export const updateFood = gql`
  mutation UpdateFood(
    $id: ID
    $name: String
    $base_amount: Float
    $proteins: Float
    $carbohydrates: Float
    $fats: Float
    $fibre: Float
  ) {
    updateFood(
      id: $id
      name: $name
      base_amount: $base_amount
      proteins: $proteins
      carbohydrates: $carbohydrates
      fats: $fats
      fibre: $fibre
    ) {
      id
      name
    }
  }
`;

export const getFoodById = gql`
  query GetFoodById($id: ID) {
    food(id: $id) {
      name
      proteins
      carbohydrates
      fats
      fibre
      base_amount
    }
  }
`;

export const getFoodByName = gql`
  query GetFoodByName($name: String) {
    foodByName(name: $name) {
      Food_Name
      Energy_without_dietary_fibre
      Protein
      Total_Fat
      Total_dietary_fibre
      Total_sugars
      Added_sugars
      Available_carbohydrate_with_sugar_alcohols
    }
  }
`;
