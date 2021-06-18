const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var cors = require('cors')

app.use(cors())
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
// const template = `{
//     "events": [
//       {{#repeat 2}}
//       {
//         "id": {{@index}},
//         "timestampStart": "{{date '1900' '2022' 'DD/MM/YYYY'}}",
//         "timestampEnd": "{{date '1900' '2022' 'DD/MM/YYYY'}}",
//         "legend": "{{lorem}}",
//         "dob": "{{date '1900' '2022' 'DD/MM/YYYY'}}",
//         "address": "{{int 1 100}} {{street}}",
//         "city": "{{city}}",
//         "zipCode": "{{zipcode}}",
//         "optedin": {{boolean}},
//         "country": "{{country }}",
//         "image": "img{{@index}}.png",
//         "location": {
//             "lat": {{float 47 49 '0.00'}},
//             "lon": {{float 2 2.5 '0.00'}}
//         }
        
//       }
//       {{/repeat}}
//     ]
//   }`;

// const template = `{
//   "events": [
//     {{#repeat 2}}
//     {
//       "address": "{{int 1 100}} {{street}}",
//       "city": "{{city}}",
//       "dob": "{{date '1900' '2022' 'DD/MM/YYYY'}}",
//       "email": "{{email}}"
//       "id": {{@index}},
//       "pin.location": {
//         "lat": {{float 45 60 '0.00'}},
//         "lon": {{float -10 10 '0.00'}}
//       }
//       "name": "{{name}}",
//       "optedin": {{boolean}},
//       "work": {{work}}
//     }
//     {{/repeat}}
//   ]
// }`;


const template = `{
  "events": [
    {{#repeat 2}}
    {
      "id": {{@index}},
      "timestampStart": "{{date '1900' '2022' 'DD/MM/YYYY'}}",
      "timestampEnd": "{{date '1900' '2022' 'DD/MM/YYYY'}}",
      "legend": "{{lorem}}",
      "dob": "{{date '1900' '2000' 'YYYY'}}",
      "address": "{{int 1 100}} {{street}}",
      "city": "{{city}}",
      "zipCode": "{{zipcode}}",
      "optedin": {{boolean}},
      "country": "{{country }}",
      "image": "img{{@index}}.png",
      "pin.location": {
        "top_left": {
          "lat": {{float 3 3.9 '0.00'}},
          "lon": {{float 47 48 '0.00'}}
        },
        "bottom_right": {
          "lat": {{float 1 1.9 '0.00'}},
          "lon": {{float 49 50 '0.00'}}
        }
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
  }).then(responce =>console.log(responce.body.items[0]))



app.get('/search', async (req, res) => {
  const { search } = require('./SearchEngine');
  const data = await search(req.query.x1,req.query.y1,req.query.x2,req.query.y2,);
  res.json(data);
})


// // voir toutes la liste de toutes les template :
// app.get('/template', 
//     (req, res) => { 
//         console.log("All template /") 
//         mysqlUtilities.getTemplate((result,error) => { 
            
//         if (!error){ 
//             res.send(result) 
//             }else{ 
//             res.status(500).send(error) 
//         } 
//     }) 
// })


//     //Récupère toutes les association template :
//     getTemplate(callback){
//       //On définis la connexion
//       var connection = mysql.createConnection(config)
//       //On lance la connexion
//       connection.connect()
//       //On envoi la query
//       connection.query('SELECT * from template', (error, results) => {
//           callback(results,error) 
//           })
//       //On ferme la connexion
//       connection.end()
//       }


app.listen(3001, () => console.log('server running at 3001'));