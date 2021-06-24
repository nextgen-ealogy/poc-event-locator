const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

const search = async (x1, y1, x2, y2) => {
  const hits = [];

  // only string values are searchable
  const searchResult = await client
    .search({
      index: "events",
      body: {
        query: {
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
        },
      },
    })
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
