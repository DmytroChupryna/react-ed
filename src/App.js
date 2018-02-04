import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id:'qwe1', name: 'Dmytro', age: 28 },
      { id:'asd19', name: 'Olena', age: 29 },
      { id:'zxc9', name: 'Egor', age: 23 }
    ],
    showPerson: false 
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    const person = {...this.state.persons[personIndex]};
    
    person.name = event.target.value;
    
    const persons = [...this.state.persons]
    persons[personIndex] = person;

    this.setState({ persons: persons })
  };

  deletePersonHandler = (personIndex) => { 
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  togglePersonsHandler = () => { 
    const doesShow = this.state.showPerson;
    this.setState({showPerson: !doesShow})
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPerson) { 
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)}/>
           })}
        </div>
      );
      
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length<=2) { 
      assignedClasses.push(classes.red)
    }
    if (this.state.persons.length<=1) { 
      assignedClasses.push(classes.bold)      
    }

    return (
        <div className={classes.App}>
          <h1>Hi I am a React App</h1>
          <p className={assignedClasses.join(' ')}>List of {this.state.persons.length} users</p>
        <button
          onClick={this.togglePersonsHandler}
          className={btnClass}>
            Toggle List
            </button>
          {persons}
        </div>
    );
  }
}

export default App;
