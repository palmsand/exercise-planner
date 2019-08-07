// need the express router since this is a route we are creating
const router = require('express').Router();
// mongoose model we created
let User = require('../models/user.model'); 

// First End Point that handles incoming http get request on the / user url path. 

// First Route if it is the root url locahost:5000/users/ will be a get request 
router.route('/').get((req, res) => {
    // find is a mongoose method that will return a promise list of users in json.
    User.find()
    // then get all the users; res.json will return users from database in json format. 
    .then(users => res.json(users))
    // if there is an error .catch return a status 400 with error message.
    .catch(err => res.status(400).json('Error: ' + err));
});

// Second End Point handles incoming http post requests. root url locahost:5000/users/add will be a post request.
router.route('/add').post((req, res) => {
    // expect in body the req.body.username the username
    const username = req.body.username;

    // create new instance of user
    const newUser = new User({username});

    // newuser is saved to the mongo db atlas databse with the save method. 
    newUser.save()
        // the we will return User added in json. 
        .then(() => res.json('User added!'))
        // or else will return an error mesage.
        .catch(err => res.status(400).json('Error: ' + err));
}); 

// Handle error when the same user is posted again; to accept or handle duplicate user names. 

module.exports = router;