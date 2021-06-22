"use strict";

const { FeedbackModel } = require("./models")

async function handleStart(context) {
    try {
        await new FeedbackModel({
            code: context.session.user.id
        }).save()
        await context.setState({
            stage: "name"
        })
        await handleName(context)
    }
    catch(err) {
        throw err
    }
}

async function handleName(context) {
    try {
        await context.sendText("Hi there!");
        await context.sendText("We would like to know your name");
        await new FeedbackModel({
            code: context.session.user.id
        }).save()
        await context.setState({
            stage: "name.response"
        })
    }
    catch(err) {
        throw err
    }
}

async function handleNameResponse(context) {
    try {
        await FeedbackModel
            .findOneAndUpdate(
                {code: context.session.user.id},
                {$set: {name: context.event.text}},
                {lean: true}
            )
            .sort({createdAt: -1})
        await context.setState({
            stage: "email"
        })
        await handleEmail(context)
    }
    catch(err) {
        throw err
    }
}

async function handleEmail(context) {
    try {
        await context.sendText(`Hello ${context.event.text}`);
        await context.sendText("Kindly help us with your email address so we can communicate with you later");
        await context.setState({
            stage: "email.response"
        })
    }
    catch(err) {
        throw err
    }
}

async function handleEmailResponse(context) {
    try {
        await FeedbackModel
            .findOneAndUpdate(
                {code: context.session.user.id},
                {$set: {email: context.event.text}},
                {lean: true}
            )
            .sort({createdAt: -1})
        await context.setState({
            stage: "rating"
        })
        await handleRating(context)
    }
    catch(err) {
        throw err
    }
}

async function handleRating(context) {
    try {

        await context.sendText("How would you rate the event between 1 and 10?",  {
            keyboard:  [
                [
                    { text: "1", callbackData: "1" },
                    { text: "2", callbackData: "2" },
                    { text: "3", callbackData: "3" },
                    { text: "4", callbackData: "4" },
                    { text: "5", callbackData: "5" },
                    { text: "6", callbackData: "6" },
                    { text: "7", callbackData: "7" },
                    { text: "8", callbackData: "8" },
                    { text: "9", callbackData: "9" },
                    { text: "10", callbackData: "10" },
                ]
            ]
        })
        await context.setState({
            stage: "rating.response"
        })
    }
    catch(err) {
        throw err
    }
}

async function handleRatingResponse(context) {
    try {
        await FeedbackModel
            .findOneAndUpdate(
                {code: context.session.user.id},
                {$set: {rating: context.event.text}},
                {lean: true}
            )
            .sort({createdAt: -1})
        await context.setState({
            stage: "seminars"
        })
        await handleSeminars(context)
    }
    catch(err) {
        throw err
    }
}

async function handleSeminars(context) {
    try {

        await context.sendText("Would you like to see more sessions like this?", {
            keyboard: [
                [
                    {text: "Yes", callbackData: "Yes"},
                    {text: "No", callbackData: "No"},
                ]
            ]
        })
        await context.setState({
            stage: "seminars.response"
        })
    }
    catch(err) {
        throw err
    }
}

async function handleSeminarsResponse(context) {
    try {
        await FeedbackModel
            .findOneAndUpdate(
                {code: context.session.user.id},
                {$set: {rating: context.event.text}},
                {lean: true}
            )
            .sort({createdAt: -1})
        await context.setState({
            stage: "topics"
        })
        await handleTopics(context)
    }
    catch(err) {
        throw err
    }
}

async function handleTopics(context) {
    try {
        await context.sendText("What topics will you like to see discussed?")
        await context.setState({
            stage: "topics.response"
        })
    }
    catch(err) {
        throw err
    }
}

async function handleTopicsResponse(context) {
    try {
        await FeedbackModel
            .findOneAndUpdate(
                {code: context.session.user.id},
                {$set: {rating: context.event.text}},
                {lean: true}
            )
            .sort({createdAt: -1})
        await context.setState({
            stage: "end"
        })
        await handleEnd(context)
    }
    catch(err) {
        throw err
    }
}

async function handleEnd(context) {
    try {
        await context.sendText("Thank you very much for your feedback")
        await context.sendText("Have a nice day")
        await context.setState({
            stage: "start"
        })
    }
    catch(err) {
        throw err
    }
}

module.exports = {
    handleStart,
    handleName,
    handleNameResponse,
    handleEmail,
    handleEmailResponse,
    handleRating,
    handleRatingResponse,
    handleSeminars,
    handleSeminarsResponse,
    handleTopics,
    handleTopicsResponse,
    handleEnd
}