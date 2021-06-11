const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const dummyjson = require('dummy-json');
const { Client } = require('@elastic/elasticsearch');
const { stringify } = require('querystring');
const client = new Client({
  node: 'http://localhost:9200/'
})
const template = `{
    "events": [
      {{#repeat 2}}
      {
        "id": {{@index}},
        "timestampStart": "{{date '1900' '2022' 'YYYY'}} {{date '01' '12' 'MM'}} {{int 01 30}}",
        "timestampEnd": "{{date '1900' '2022' 'YYYY'}} {{date '01' '12' 'MM'}} {{int 01 30}}",
        "legend": "{{lorem}}",
        "dob": "{{date '1900' '2000' 'YYYY'}}",
        "address": "{{int 1 100}} {{street}}",
        "city": "{{city}}",
        "zipCode": "{{zipcode}}",
        "optedin": {{boolean}},
        "country ": "{{country }}",
        "image": "img{{@index}}.png",
        "location": {
            "x": {{float -50 50 '0.00'}},
            "y": {{float -25 25 '0.00'}}
        }
        
      }
      {{/repeat}}
    ]
  }`;

const result = JSON.parse(dummyjson.parse(template)); // Returns a string

/**
 * { "index" : { "_index" : "movies18", "_id" : "1" } }
{ "field1" : "value1" }
{ "delete" : { "_index" : "movies18", "_id" : "2" } }
{ "update" : {"_id" : "1", "_index" : "movies18"} }
{ "doc" : {"field2" : "value2"} }
 */

const body = result.events.flatMap(doc => [{ index: { _index: 'events' } }, doc])

console.log(body)
client.bulk({
    index: "events",
    body: body
  })



// searching on query
app.get('/search/:index/:type', async (req, res) => {
  const { phraseSearch } = require('./SearchEngine');
  const data = await phraseSearch(req.params.index, req.params.type, req.query.q);
  res.json(data);
});

app.listen(9200, () => console.log('server running at 9200'));