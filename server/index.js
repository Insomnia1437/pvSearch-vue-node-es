/* eslint-disable no-console */
// require the Elasticsearch library
const elasticsearch = require('elasticsearch');
// instantiate an elasticsearch client
const client = new elasticsearch.Client({
  hosts: ['http://172.19.66.33:9200'],
});
// require Express
const express = require('express');
// instanciate an instance of express and hold the value in a constant called app
const app = express();
// require the body-parser library. will be used for parsing body requests
const bodyParser = require('body-parser');
// require the path library
const path = require('path');

// ping the client to be sure Elasticsearch is up
client.ping({
  requestTimeout: 30000,
}, (error) => {
  // at this point, eastic search is down, please check your Elasticsearch service
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('elasticsearch cluster is ok');
  }
});


// use the bodyparser as a middleware
app.use(bodyParser.json());
// set port for the app to listen on
app.set('port', process.env.PORT || 3001);
// set path to serve static files
app.use(express.static(path.join(__dirname, '../dist')));
// enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// defined the base route and return with an HTML file called tempate.html
app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, 'dist'),
  });
});

// // define the /search route that should return elastic search results
app.get('/search', (req, res) => {
  // declare the query object to search elastic search
  // return only 200 results from the first result found.
  // also match any data where the name is like the query string sent in
  const body = {
    size: 100,
    from: 0,
    query: {
      match: {
        PVNAME: {
          query: req.query.q,
          operator: 'and',
        },
      },
    },
  };
  //     // perform the actual search passing in the index, the search query and the type
  client.search({ index: 'linac-epics-pv', body })
    .then((results) => {
      res.send(results.hits.hits);
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
});
// listen on the specified port
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
