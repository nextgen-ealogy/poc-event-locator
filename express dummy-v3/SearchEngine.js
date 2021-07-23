const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

const search = async (x1, y1, x2, y2, startDate, endDate) => {
  const hits = [];
  

  // only string values are searchable
  // const searchResult = await client
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

// query geo_bounding_box & query
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
    //     },
    //     "query": {
    //       "bool": {
    //         "must": {
    //           "match_all": {}
    //         },
    //         "filter": {
    //           "range": {
    //             "timestamp": {
    //               "gte": d1,
    //               "lte": d2
    //             }
    //           }
    //         }
    //       }
    //     }
    //     },
    //   },
    // )

    const query = {
      bool: {
        filter: [
          {
            geo_bounding_box: {
              location: {
                top_left: {
                  lat: parseFloat(x1),
                  lon: parseFloat(y1),
                },
                bottom_right: {
                  lat: parseFloat(x2),
                  lon: parseFloat(y2),
                },
              },
            },
          }
        ]
      }
    }

    if(startDate && endDate ){

      query.bool.filter.push({
        "query": {
          "bool": {
            "filter": {
              "range": {
                "timestamp": {
                  "gte": startDate,
                  "lte": endDate
                }
              }
            }
          }
        }
      })
    }
    const searchResult = await client
      .search({
        index: "events",
        body: {
          size : 100,
          query: query
        },
      })

// query geo_bounding_box & query range timestamp
    // .search({
    //   index: "events",
    //   body: {
    //     size : 100,
    //     query: {
    //       geo_bounding_box: {
    //         location: {
    //           top_left: {
    //             lat: parseFloat(x1),
    //             lon: parseFloat(y1),
    //           },
    //           bottom_right: {
    //             lat: parseFloat(x2),
    //             lon: parseFloat(y2),
    //           },
    //         },
    //       },
    //     },
    //     "query": {
    //       "range": {
    //         "timestamp": {
    //           "gte": Boolean(d1),
    //           "lt": Boolean(d2)
    //         }
    //       }
    //     }
    //   },
    // })

  


    .catch((e) => console.log("err", e));
  console.log(JSON.stringify(searchResult));

  if (
    searchResult &&
    searchResult.body &&
    searchResult.body.hits &&
    searchResult.body.hits.hits &&
    searchResult.body.hits.hits.length > 0
  ) {
    hits.push(...searchResult.body.hits.hits);
  }

  return {
    hitsCount: hits.length,
    hits,
  };
};

module.exports = {
  search,
};
