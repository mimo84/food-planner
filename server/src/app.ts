require('./config/config'); //instantiate configuration variables
import { ApolloServer } from 'apollo-server';
import resolvers from './services/resolvers';
import typeDefs from './services/typeDefs';
import models from './models';

const port = process.env.PORT || '3000';

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to SQL database:', process.env.DB_NAME);
  })
  .catch(err => {
    console.error(
      'Unable to connect to SQL database:',
      process.env.DB_NAME,
      err
    );
  });

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url} environment: ${process.env.NODE_ENV}`);
});

module.exports = server;
