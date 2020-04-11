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
    `mongodb://user:password1@ds131139.mlab.com:31139/heroku_9jgfmkc6`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});

app.get(`/exercise`, function (req, res) {
  res.sendFile(path.join(__dirname, `./public/exercise.html`));
});

app.get(`/`, function (req, res) {
  res.sendFile(path.join(__dirname, `./public/index.html`));
});

app.get(`/stats`, function (req, res) {
  res.sendFile(path.join(__dirname, `./public/stats.html`));
});

app.get(`/api/workouts`, (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get(`/api/workouts/range`, (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post(`/api/workouts`, (req, res) => {
  db.Workout.create({})
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put(`/api/workouts/:id`, (req, res) => {
  db.Workout.update({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then((updatedWorkout) => {
      res.json(updatedWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
