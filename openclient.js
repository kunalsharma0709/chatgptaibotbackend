require("dotenv").config();
const { OpenAI } = require("openai");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("OpenAI Key:", process.env.OPENAI_API_KEY);


module.exports = openai;
