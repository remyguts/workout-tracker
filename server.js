"use strict";

const express = require(`express`);
const logger = require(`morgan`);
const mongoose = require(`mongoose`);

const PORT = process.env.PORT || 3000;

const app = express();
const path = require(`path`);
const db = require(`./models`);
