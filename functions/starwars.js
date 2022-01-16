const axios = require("axios");
require("dotenv").config();
const { BASE_API_URL } = require("./utils/constants");
const Redis = require("ioredis");

const redis = new Redis(process.env.DB_CONNECTION_URL);

exports.handler = async (event, context, callback) => {
  try {
    const { name } = JSON.parse(event.body);

    const cachedResult = await redis.get(name);
    if (cachedResult) {
      console.log("returning cached data");

      return {
        statusCode: 200,
        body: JSON.stringify(JSON.parse(cachedResult)),
      };
    }

    const { data } = await axios.get(`${BASE_API_URL}/${name}`);

    redis.set(name, JSON.stringify(data.results), "EX", 60);

    console.log("returning fresh data");

    return {
      statusCode: 200,
      body: JSON.stringify(data.results),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify("Something went wrong. Try again later."),
    };
  }
};
