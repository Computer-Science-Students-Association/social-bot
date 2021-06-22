"use strict";

const services = require("./services");

module.exports = async function App(context) {
  try {
    console.log(context.state.stage)
    switch(context.state.stage) {
      case "start": {
        return  await services.handleStart(context)
      }
      case "name": {
        return  await services.handleName(context)
      }
      case "name.response": {
        return  await services.handleNameResponse(context)
      }
      case "email": {
        return  await services.handleEmail(context)
      }
      case "email.response": {
        return  await services.handleEmailResponse(context)
      }
      case "rating": {
        return  await services.handleRating(context)
      }
      case "rating.response": {
        return  await services.handleRatingResponse(context)
      }
      case "seminars": {
        return  await services.handleSeminars(context)
      }
      case "seminars.response": {
        return  await services.handleSeminarsResponse(context)
      }
      case "topics": {
        return  await services.handleTopics(context)
      }
      case "topics.response": {
        return  await services.handleTopicsResponse(context)
      }
      case "end": {
        return  await services.handleEnd(context)
      }
      default: {
        console.log("default")
      }
    }
  }
  catch(err) {
    console.log(err)
  }
};
