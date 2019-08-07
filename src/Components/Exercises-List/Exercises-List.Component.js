import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a> 
        </td>
    </tr>
)

export default class ExercisesList extends Component {
// constructor to initialize state with empty exercises array

constructor(props){
    super(props);

    // create delete exercise method, since in the list of exercises we are going to click a button to delete an exercise.

    this.deleteExercise = this.deleteExercise.bind(this);

    // initialize the state; only going to be one item an empty array of exercises. 

    this.state = { 
        exercises: []
    };
}

// This code will run before the page is rendered and add a list of exercises to the state. 

componentDidMount() {
    // axios.get endpoint that is going to get list of exercises from the database.
    axios.get('http://localhost:5000/exercises/')
        .then(response => {
        // asign response to the exercises array; we do want all the fields for the exercises. 
        this.setState({ exercises: response.data})  
        })
        .catch((error)=> {
            console.log(error);
        })
}

// will take an id; object id that mongodb automatically assigns to the exercise we are deleting. 
deleteExercise(id) {
    // sending a delete request to this url/id, put the id at the end, the exact route we created in the backend. 
    axios.delete('http://localhost:5000/exercises/'+id)
    // log that is has been delete, it will say exercise deleted that we get form the backend. 
    .then(res => console.log(res.data));

    // after we delete the exercise from the datatbase, we also have to delete the exercise from what is being displayed to the user. Going to be a table and row for each exercise. We want to delete that element, that item right from the table. 

    // setState React will automatically update the page with that new state. 
    this.setState({
        // filter it, only return certain elements back to exercises here. For every element in the exercises array, we are going to return it if el._id does not equal id. Whenever the id of the exercise in the exercises array does not equal the id we are deleting we will pass it back to the exercises array. A way to remove the exercise we are deleting. What is _id. Go to mongodb atlas dashboard and see that _id is automatically created. So the id in the database is _id and is created automatically when we created the object. 
        exercises: this.state.exercises.filter(el => el._id !== id)
    })
}

exerciseList() {
    // map will return something for every element in the array
    return this.state.exercises.map(currentexercise => {
        // it will return a component and the component will be a row of the table. We are passing 3 props. Think of these like variables; exercise is the variable name and the value is currentexercise. Passing in the deleteExercise method and pass in the key. This exercise component. 
        return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
}
 
    // update the return statement of the render function. 
    render() {
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* the body will call the exerciseList() method that will return the rows of the table.  */}
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
} 