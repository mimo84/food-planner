import * as React from 'react';
import { Component } from 'react';
import { withApollo } from 'react-apollo';
import { getFoodByName } from '../../queries/food';
import { Food } from '../../types';
import firebase from '../../firebase';
import {
  TextField,
  Grid,
  Button,
  Paper,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody
} from '@material-ui/core';
interface PlannerState {
  foundFoods: Food[];
  newMeal: string;
  currentMeal: string;
  meals: {
    [mealName: string]: any;
  };
}
class Planner extends Component<any, PlannerState> {
  state: PlannerState = {
    foundFoods: [],
    newMeal: '',
    currentMeal: 'Lunch',
    meals: {
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      Snacks: []
    }
  };

  searchFoodByName = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const {
      data: { foodByName }
    } = await this.props.client.query({
      query: getFoodByName,
      variables: { name: target.value }
    });

    this.setState({
      foundFoods: foodByName
    });
  };

  handleNewMeal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;

    this.setState({
      newMeal: target.value
    });
  };

  addMealHandler = () => {
    const mealName = this.state.newMeal;
    const mealItems = this.state.meals[mealName]
      ? this.state.meals[mealName]
      : [];

    this.setState((prevState: PlannerState) => ({
      ...prevState,
      newMeal: '',
      currentMeal: mealName,
      meals: {
        ...prevState.meals,
        [mealName]: mealItems
      }
    }));
  };

  selectMeal = (mealName: string) => {
    this.setState({
      currentMeal: mealName
    });
  };

  addFoodHandler = (currentFood: Food, amount: number) => {
    const { currentMeal } = this.state;
    this.setState(prevState => {
      return {
        foundFoods: [],
        meals: {
          ...prevState.meals,
          [currentMeal]: [
            ...prevState.meals[currentMeal],
            { food: { ...currentFood, foodAmount: amount }, amount }
          ]
        }
      };
    });
  };

  deleteMeal = (mealName: string) => {
    const { meals } = this.state;
    const { [mealName]: value, ...rest } = meals;
    this.setState({
      meals: { ...rest }
    });
  };

  deleteFood = (mealName: string, index: number) => {
    const meals = this.state.meals[mealName].filter((item: Food, i: number) => {
      return i !== index;
    });
    this.setState(prevstate => {
      return {
        meals: {
          ...prevstate.meals,
          [mealName]: meals
        }
      };
    });
  };

  componentDidMount() {
    const db = firebase.firestore();
    db.collection('meal')
      .where('name', '==', 'sat_23_march_2019')
      .get()
      .then(e => {
        console.log(e);
      })
      .catch(e => console.log(e));
  }

  savePlan = () => {
    const { meals } = this.state;
    const db = firebase.firestore();
    const mealRef = db
      .collection('meal')
      .add({ name: 'sat_23_march_2019', meals })
      .then(e => {
        console.log(e);
      });
    console.log(mealRef);
    console.log(meals);
    // const itemsRef = firebase.database().ref('items');
    // const test = itemsRef.push(meals);
    // console.log(test);
  };

  handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() === 'enter') {
      this.addMealHandler();
    }
  };

  handleFoodAmountChange = (
    newValue: string,
    mealName: string,
    index: number
  ) => {
    this.setState(prevState => {
      prevState.meals[mealName][index].amount = newValue;
      return prevState;
    });
  };

  render() {
    let dayNutrients = {
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      fibres: 0
    };
    const nutrientRecapStyle = {
      maxWidth: '700px'
    };
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={8}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={this.state.newMeal}
                onChange={this.handleNewMeal}
                onKeyPress={this.handleKeyPress}
              />
            </Grid>
            <Grid item xs={4}>
              <Button onClick={this.addMealHandler}>Add Meal</Button>
            </Grid>
          </Grid>

          <Grid container justify="space-around" spacing={8}>
            <Grid item>
              <TextField
                placeholder="Search for food here"
                onChange={this.searchFoodByName}
              />
            </Grid>
          </Grid>
          <Grid container justify="space-around" spacing={8}>
            {this.state.foundFoods.map((food: Food, idx: number) => {
              return (
                <Grid
                  item
                  key={idx}
                  onClick={() => this.addFoodHandler(food, 100)}
                >
                  <Paper elevation={1}>
                    <Typography variant="subheading" component="h3">
                      {food.Food_Name}
                    </Typography>
                    <Typography component="p">
                      &nbsp;<strong>proteins:</strong> {food.Protein}
                      &nbsp;<strong>fats: </strong> {food.Total_Fat}
                      &nbsp;<strong>carbs: </strong>
                      {food.Available_carbohydrate_with_sugar_alcohols}
                      &nbsp;<strong>fibre: </strong> {food.Total_dietary_fibre}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {Object.keys(this.state.meals).map(mealName => {
            let mealNutrients = {
              proteins: 0,
              fats: 0,
              carbohydrates: 0,
              fibres: 0
            };
            return (
              <React.Fragment key={mealName}>
                <h2
                  style={
                    mealName === this.state.currentMeal
                      ? { background: '#81d4fa' }
                      : {}
                  }
                >
                  {mealName}{' '}
                  <Button onClick={() => this.deleteMeal(mealName)}>
                    Delete {mealName}
                  </Button>
                  <Button onClick={() => this.selectMeal(mealName)}>
                    Select {mealName}
                  </Button>
                </h2>
                {this.state.meals[mealName].length && (
                  <Table style={nutrientRecapStyle}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          Name
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          Proteins{' '}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          Fats
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          Carbs
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          Fibre
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.meals[mealName].map(
                        (
                          { food, amount }: { food: Food; amount: number },
                          i: number
                        ) => {
                          const foodProtein = +(
                            (this.state.meals[mealName][i].amount / +100) *
                            +food.Protein
                          ).toPrecision(2);
                          const foodCarbs = +(
                            (this.state.meals[mealName][i].amount / +100) *
                            +food.Available_carbohydrate_with_sugar_alcohols
                          ).toPrecision(2);
                          const foodFats = +(
                            (this.state.meals[mealName][i].amount / +100) *
                            +food.Total_Fat
                          ).toPrecision(2);
                          const foodFibre = +(
                            (this.state.meals[mealName][i].amount / +100) *
                            +food.Total_dietary_fibre
                          ).toPrecision(2);

                          mealNutrients.proteins += foodProtein;
                          mealNutrients.fibres += foodFibre;
                          mealNutrients.fats += foodFats;
                          mealNutrients.carbohydrates += foodCarbs;

                          dayNutrients.proteins += foodProtein;
                          dayNutrients.fibres += foodFibre;
                          dayNutrients.fats += foodFats;
                          dayNutrients.carbohydrates += foodCarbs;
                          return (
                            <TableRow key={`food_${i}`} hover>
                              <TableCell align="center">
                                {food.Food_Name}
                              </TableCell>
                              <TableCell align="center">
                                <input
                                  value={this.state.meals[mealName][i].amount}
                                  onChange={e =>
                                    this.handleFoodAmountChange(
                                      e.currentTarget.value,
                                      mealName,
                                      i
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell align="center">
                                {foodProtein}
                              </TableCell>
                              <TableCell align="center">{foodFats}</TableCell>
                              <TableCell align="center">{foodCarbs}</TableCell>
                              <TableCell align="center">{foodFibre}</TableCell>
                              <TableCell align="center">
                                <Button
                                  onClick={e => this.deleteFood(mealName, i)}
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                )}
                <Table style={nutrientRecapStyle}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        Nutrient
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        Proteins
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {mealNutrients.proteins}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        carbohydrates
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {mealNutrients.carbohydrates}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        Fats
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {mealNutrients.fats}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        Fibre
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {mealNutrients.fibres}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </React.Fragment>
            );
          })}
          <Table style={nutrientRecapStyle}>
            <TableHead>
              <TableRow>
                <TableCell
                  component="th"
                  colSpan={2}
                  scope="row"
                  padding="none"
                  align="center"
                >
                  Total day amount of nutrients
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell role="th">Proteins</TableCell>
                <TableCell align="center">{dayNutrients.proteins}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell role="th">carbohydrates</TableCell>
                <TableCell align="center">
                  {dayNutrients.carbohydrates}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell role="th">Fats</TableCell>
                <TableCell align="center">{dayNutrients.fats}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell role="th">Fibre</TableCell>
                <TableCell align="center">{dayNutrients.fibres}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={this.savePlan}>Save</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withApollo(Planner);
