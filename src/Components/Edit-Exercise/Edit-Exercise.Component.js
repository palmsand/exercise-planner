import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercises extends Component {

    constructor(props) {
        // In JavaScript classes we always call super when defining the constructor of a subclass. All react component classes that have a constructor should start with a super props call.
        super(props);


        // To make sure the this keyword on each method refers to the class CreateExercise, we will bind the methods.
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        // set the initial state of a component by assigning an object to this.state. Need properties of the state that corresponds to the fields in the mongodb document.  
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users:[]  // use only in this component for the dropdown menu to select users in the database. Select user to associate with exercise.
        }

        // State is how you create variables in react. Never do let name = "beau". Create everything in state so when we update the state it will automatically update the page with the new values. 
    }

    // People filling out the form will select the user associated with the exercise from a dropdown list; the list data will eventually come from mongodb database. For now will will create a single user.

    // react lifecycle method that will automatically be called right before anything displays on the page. So when this CreateExercise component is about to load to the page, right before anything loads it will call this code. 

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        })
        .catch(function (error) {
            console.log(error);
        })

        // axios get request
        axios.get('http://localhost:5000/users/')
        // after we do the request .then, we are going to take the response and pass into the arrow function.
            .then(response=> {
                // check if there is a response; at least 1 user in the database.  
                if(response.data.length > 0) {
                    // if so then setState
                    this.setState({
                        // data will be an array; we are going to map the array which will allows to return something for every element in the array. Pass in each user in the array, we will return user.username. Go to mongodb atlas and see the object structure for each user.
                        users: response.data.map(user => user.username)
                    })
                }
            })
    }

     // At the end of constructor add methods which can be used to update the state properties. We are going to have a web form with a text box for the user to enter the username. When a username is entered it will call the onChangeUsername() function and it will set the state e.target.value where the target is the textbox and the value of the textbox; set the value of username to the value of the textbox. It doesn't replace the state with username: e.target.value it will update the username element within the state. 

     onChangeUsername(e) {
        // when the username is being changes we will set the state. Use setState method
        // for each method make sure this is referring to the class CreateExercise
        this.setState({
            username: e.target.value
        });
     }

     onChangeDescription(e) {
        // when the username is being changes we will set the state. Use setState method.
        this.setState({
            description: e.target.value
        });
     }

     onChangeDuration(e) {
        // when the username is being changes we will set the state. Use setState method.
        this.setState({
            duration: e.target.value
        });
        
     }

    // use a library to make a calendar to appear and click date on calendar; pass in the // date and set it with date that was passed in.
     onChangeDate(date) {
        // when the username is being changes we will set the state. Use setState method.
        this.setState({
            date: date
        });
     }

     // handle the submit event on form

     onSubmit(e) {
         // prevent html form submit behvaior from taking place; it will do what we define below.
         // eventually will submit below data to the mongodb atlas database
        e.preventDefault(); 
        // inside methods we can create variable if they will only be used within that method
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);
        //console.log(JSON.stringify(exercise));

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise).then(res => console.log(res.data));

        // after exercise has been submitted, take user back to homepage a list of exercises
        window.location = "/";
     }

    // create html form

    render() {
        return(
            <div>
                <h3>Edit Exercise Log</h3>
                {/* call on submit when button is clicked */}
                <form onSubmit={this.onSubmit}> 
                    <div className="form-group">
                        <label>Username: </label>
                        {/* dropdown menu set value; onChange the selection triggers this.onChangeUsername*/}
                        <select ref="userInput" 
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                              {/* inside select box we have options from users array; use curly braces to put javascript; this.state.users comes from mongodb .map allows to return something for each element in the array; take a user, for each user in the array it will return an option of the select box; in the option we have a key which is the user, value which is the user and the actual use will appear.*/}
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        {/* description is a standar input box; set value and onChange method called any time it is changed. */}
                        <label>Description: </label>
                        <input type="text" 
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            {/* datepicker component that will pop up calendar where we can add a date; selected is initial selection; onChange when change selection. */}
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>

                    </div>
                </form>
            </div>
        )
    }
} 