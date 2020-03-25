"use strict";

const express = require(`express`);
const logger = require(`morgan`);
const mongoose = require(`mongoose`);

const PORT = process.env.PORT || 3000;

const app = express();
const path = require(`path`);
const db = require(`./models`);

app.use(logger(`dev`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));

mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb://<dbuser>:<dbpassword>@ds335957.mlab.com:35957/heroku_lb6j4qxr`,
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
);
