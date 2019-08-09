// requiring router
const router = require('express').Router();
// requiring model we created
let Exercise = require('../models/exercise.model');

// First Route if it is the root url locahost:5000/exercises/ will be a get request 

router.route('/').get((req, res) => {
    // Mongoose command find, that will find all exercises from the database.
    Exercise.find()
        // Then it will return all exercises and return them as json.
        .then(exercises => res.json(exercises))
        // Or else will return an error. 
        .catch(err => res.status(400).json('Error: ' + err));
});

// Second Route if it is the root url locahost:5000/exercises/add will be a post request. 

router.route('/add').post((req, res) => {
    // Then instead of having a username in the body, we will have username, description, duration, date and they will be assigned to these variables. Get the information from the body.
    const username = req.body.username;
    const description = req.body.description;
    // converting duration to a number
    const duration = Number(req.body.duration);
    // converting the date to a date datatype
    const date = Date.parse(req.body.date);

    //Create a new exercise using all the variables we created.

    const newExercise = new Exercise({
        username,
        description,
        duration, 
        date,
    });

    // Then we save the exercise. 
    newExercise.save()
        // Then it is a promise that will return the json Exercise added! 
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Third Route if it is the root url locahost:5000/exercises/id will be a post request 

// If you go to exercises/id & pass in the object id from the database and you do a get request we are going to return information for that exercise. 
router.route('/:id').get((req, res) => {
    // pass in the id from the url and finding from the id
    Exercise.findById(req.params.id)
    // once we get the exercise we return it as json
        .then(exercise => res.json(exercise))
        // else return an error
        .catch(err => res.status(400).json('Error: ' + err));
});

// Fourth Route if it is the root url locahost:5000/exercises/id will be a post request 

// If you go to exercises/id & pass in the object id from the database and you do a delete request we are going to find by id and delete.
router.route('/:id').delete((req, res) => {
    // pass in the id from the url and finding from the id
    Exercise.findByIdAndDelete(req.params.id)
    // then after it is deleted, it will return Exercise deleted.
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Fifth Route if it is the root url locahost:5000/exercises/update/id will be a post request 

// If you go to exercises/id & pass in the object id from the database and you do a post request we are going to find the current exercise by id and update it.
router.route('/update/:id').post((req, res) => {
    // pass in the id from the url and finding from the id
    Exercise.findById(req.params.id)
        // once we get the exercise from the database
        .then(exercise => {
            // take exercise.username to equal req.body.username since this route needs to receive an json object that will contain a username, description, duration and date; like when adding a new exercise. This time we are going to take the information and assigning them to the fields to an exercise that already exists. 
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            // save the exercise with the new information
            exercise.save()
            // return exercise updated
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        });
});

module.exports = router;