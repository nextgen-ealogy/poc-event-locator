const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

// const search = async (x1,y1,x2,y2) => {
  const search = async (x1,y1,x2,y2,x3,y3,x4,y4,x5,y5) => {

  const hits = [];

  // only string values are searchable
  const searchResult = await client
    // .search({
    //   index: 'point',
    //   body: {
    //       "query": {
    //         "geo_bounding_box": {
    //           "location": {
    //             "top_left": {
    //               "lat": x1,
    //               "lon":y1
    //             },
    //             "bottom_right": {
    //               "lat": x2,
    //               "lon": y2
    //             }
    //           }
    //         }
    //       }
    //     },
    //   },
    // )

    // .search({
    //   index: 'events',
    //   body: {
    //     "query": {
    //       "bool": {
    //         "must": {
    //           "match_all": {}
    //         },
    //         "filter": {
    //           "geo_bounding_box": {
    //             "location": {
    //               "top_left": {
    //                 "lat": x1,
    //                 "lon": y1
    //               },
    //               "bottom_right": {
    //                 "lat": x2,
    //                 "lon": y2
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //     },
    //   },
    // )


    .search({
      index: 'events',
      body: {
        "query": {
          "bool": {
            "must": {
              "match_all": {}
            },
            "filter": {
              "geo_shape": {
                "ignore_unmapped": true,
                "location": {
                  "relation": "INTERSECTS",
                  "shape": {
                    "type": "Polygon",
                    "coordinates": [
                      [
                        [
                         x1,
                          y1
                        ],
                        [
                          x2,
                          y2
                        ],
                        [
                          x3,
                          y3
                        ],
                        [
                          x4,
                          y4
                        ],
                        [
                          x5,
                          y5
                        ]
                      ]
                    ]
                  }
                }
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
    //     "query": {
    //       "bool": {
    //         "must": [],
    //         "filter": [
    //           {
    //             "match_all": {}
    //           },
    //           {
    //             "geo_bounding_box": {
    //               "pin.location": {
    //                 "top_left": [
    //                  x1,
    //                  y1
    //                 ],
    //                 "bottom_right": [
    //                   x2,
    //                   y2
    //                 ]
    //               }
    //             }
    //           }
    //         ],
    //         "should": [],
    //         "must_not": []
    //       }
    //     }
    //     },
    //   },
    // )

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