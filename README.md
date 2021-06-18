# poc-event-locator
put http://localhost:9200/events
{
    "aliases": {},
    "mappings": {
      "properties": {
        "address": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "city": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "dob": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "email": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "id": {
          "type": "long"
        },
        "location": {
          "type": "geo_shape"
        },
        "name": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "optedin": {
          "type": "boolean"
        },
        "work": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        }
      }
    }

}


post http://localhost:9200/events/_search

{
  "query": {
    "geo_bounding_box": {
      "location": {
        "top_left": {
          "lat": 49.08,
          "lon": 2.86
        },
        "bottom_right": {
          "lat": 48.62,
          "lon": 1.83
        }
      }
    }
  }
}