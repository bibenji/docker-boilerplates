import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import io from 'socket.io';

// Some fake data
const books = [
  {
    title: 'Harry Potter and the Sorcerer\'s stone',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
  Query: {books: () => books},
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.get('/', (req, res) => {
  res.send('Bonjour monsieur !');
});

const server = http.createServer(app);
const chat = io(server);
chat.on('connection', client => {
  console.log('nouvelle connexion', client);
});
chat.on('event', data => {
  console.log('nouvel événement', data);
});
chat.on('disconnect', () => {
  console.log('déconnexion');
});

app.get('/chat', (req, res) => {
  res.sendFile('./chat.html', {root: __dirname});
});

// Start the server
server.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
