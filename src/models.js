"use strict";

const { Schema, SchemaTypes, model } = require("mongoose");

const FeedbackSchema = new Schema(
    {
        code: {
            type: SchemaTypes.String,
            required: true
        },
        name: {
            type: SchemaTypes.String,
            required: false
        },
        email: {
            type: SchemaTypes.String,
            required: false
        },
        rating: {
            type: SchemaTypes.String,
            required: false
        },
        moreSerminars: {
            type: SchemaTypes.String,
            enum: ["Yes", "No"],
            required: false
        },
        topicsToDiscuss: {
            type: SchemaTypes.String,
            required: false
        },
    },
    {
        timestamps: true
    }
)

const FeedbackModel  = new model("Feedback", FeedbackSchema);

module.exports = {
    FeedbackModel
}