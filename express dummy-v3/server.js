const express = require("express");
const bodyParser = require("body-parser");
const app = express();

var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const dummyjson = require("dummy-json");
const { Client } = require("@elastic/elasticsearch");
const { stringify } = require("querystring");
const client = new Client({
  node: "http://localhost:9200/",
});

// Paris
const template = `{
  "events": [
    {{#repeat 10}}
    {
      "id": {{@index}},
      "timestamp": "{{date 1900 1950 'YYYY-MM-dd'}}",
      "legend": "{{lorem}}",
      "dob": "{{date '1900' '2000' 'YYYY'}}",
      "address": "{{int 1 100}} {{street}}",
      "city": "{{city}}",
      "zipCode": "{{zipcode}}",
      "optedin": {{boolean}},
      "country": "{{country }}",
      "image": "img{{@index}}.png",
      "location": {
          "lat": {{float 48.5 49.26 '0.00'}},
          "lon": {{float 3.2 1.6 '0.00'}}
      }
    }
    {{/repeat}}
  ]
}`;

// Lille
// const template = `{
//   "events": [
//     {{#repeat 10}}
//     {
//       "id": {{@index}},
//       "timestamp": "{{date 1900 1950 'YYYY-MM-dd'}}",
//       "legend": "{{lorem}}",
//       "dob": "{{date '1900' '2000' 'YYYY'}}",
//       "address": "{{int 1 100}} {{street}}",
//       "city": "{{city}}",
//       "zipCode": "{{zipcode}}",
//       "optedin": {{boolean}},
//       "country": "{{country }}",
//       "image": "img{{@index}}.png",
//       "location": {
//         "lat": {{float 50.42 50.77 '0.00'}},
//         "lon": {{float 2.89 3.27 '0.00'}}
//       }
//     }
//     {{/repeat}}
//   ]
// }`;

const result = JSON.parse(dummyjson.parse(template)); // Returns a string


const body = result.events.flatMap((doc) => [{ index: { _index: "events" } }, doc]);

console.log(body);
client
  .bulk({
    index: "events",
    body: body,
  })
  .then((responce) => console.log(responce.body.items[0]));

app.get("/search", async (req, res) => {
  const { search } = require("./SearchEngine");
  const data = await search(req.query.x1, req.query.y1, req.query.x2, req.query.y2, req.query.timestampStart, req.query.timestampEnd);
  res.json(data);
});
app.listen(3001, () => console.log("server running at 3001"));

