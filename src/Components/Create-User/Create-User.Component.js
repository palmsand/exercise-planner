import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {

    constructor(props) {
        // In JavaScript classes we always call super when defining the constructor of a subclass. All react component classes that have a constructor should start with a super props call.
        super(props);


        // To make sure the this keyword on each method refers to the class CreateUser, we will bind the methods.
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        // set the initial state of a component by assigning an object to this.state. Need properties of the state that corresponds to the fields in the mongodb document.  
        this.state = {
            username: ''
        }

        // State is how you create variables in react. Never do let name = "beau". Create everything in state so when we update the state it will automatically update the page with the new values. 
    }

    onChangeUsername(e) {
        this.setState ({
            username : e.target.value 
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log(user);

        // send user data to the backend; will send an http post request to the backend end point; the endpoint is expecting a json object in the request body (we send that as user a second argument). After it is posted we get a result; .then a promise, we will console.log res.data. 

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));
        

        // keep users on this page so they can enter multiple users at a time. To achieve this we will use this.setState{()} and set user to blank. After somebody enters the user, we have to set it back to blank. Eventually this will connect to the databse. 
        this.setState({
            username: ''
        })
    }

    render() {
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            value="Create User"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
} 