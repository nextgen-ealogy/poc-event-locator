const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

const search = async (x1, y1, x2, y2, timestampStart, timestampEnd) => {
  const hits = [];
  
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

  query.bool.filter.push({
    "range": {
            "timestamp": {
              "gte": timestampStart,
              "lte": timestampEnd,
            }
          }
  })

  console.log(query)

  const searchResult = await client
    .search({
      index: "events",
      body: {
        size : 100,
        query: query
      },
    })
    
    .catch((e) => console.log("err", e));
    console.log("searchResult :",JSON.stringify(searchResult));
    console.log(searchResult.body.hits)

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
