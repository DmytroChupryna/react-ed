import React, { Component } from 'react';
import './App.css';
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
    const style = {
      backgroundColor: 'green',
      padding: '10px 15px',
      border: '1px solid violet',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '20px',
      cursor: 'pointer',
    }

    let persons = null;
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

      style.backgroundColor = 'red';
      
    }

    const classes = [];
    if (this.state.persons.length<=2) { 
      classes.push('red')
    }
    if (this.state.persons.length<=1) { 
      classes.push('bold')      
    }

    return (
        <div className="App">
          <h1>Hi I am a React App</h1>
          <p className={classes.join(' ')}>List of {this.state.persons.length} users</p>
          <button onClick={this.togglePersonsHandler} style={style}>
            Toggle List
            </button>
          {persons}
        </div>
    );
  }
}

export default App;
