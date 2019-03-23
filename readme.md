# About this project

Frustrated by the inability for me to have a nice service to plan my weekly meals through existing apps (I am looking at you MyFitnessPal), I started using an excel spreadsheet.
Now it's time to move to something more structured :)

## Planned Structure:

### Client:

Built with:

- TypeScript + React
- GraphQL with Apollo
- Material UI
- Firebase

### Server

Built with:

- NodeJS
- ExpressJS
- SequelizeJS
- GraphQL
- SQLite

### Overall idea

The SQLite implementation will contain the ingredients with the nutritional values
The FireBase DB is going to keep store of all each day and each meal, copying the nutritional values of the foods.
The frontend will be responsible to calculate calories and macros for each meal and each day.
Also I plan to have it able configure the nutritional values that I want to have.
Maybe it would be nice to keep a diary for the weight etc.

# How to run it

In the `server` directory create the `.env` file either by copying the `env.example` or creating a new one yourself.

Run `npm start` in both folders: `client` and `server`.
