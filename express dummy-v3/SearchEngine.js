const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const search = async (x1,y1,x2,y2) => {
  const hits = [];

  // only string values are searchable
  const searchResult = await client
    .search({
      index: 'events',
      body: {
          "query": {
            "geo_bounding_box": {
              "location": {
                "top_left": {
                  "lat": x1,
                  "lon":y1
                },
                "bottom_right": {
                  "lat": x2,
                  "lon": y2
                }
              }
            }
          }
        },
      },
    )

    // .search({
    //   index: 'events',
    //   body: {
    //          "pin": {
    //           "location": {
    //               "lat": x1,
    //               "lon":y1
    //           }
    //         }
    //     },
    //   },
    // )


    // .search({
    //   index: 'events',
    //   body: {
    //     "text": "Geo-point as an object",
    //           "location": {
    //               "lat": x1,
    //               "lon":y1
    //           }
    //     },
    //   },
    // )
    .catch((e) => console.log('err', e));
  if (
    search &&
    search.body &&
    search.body.hits &&
    search.body.hits.hits &&
    search.body.hits.hits.length > 0
  ) {
    hits.push(...searchResult.body.hits.hits);
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};

module.exports = {
  search
};