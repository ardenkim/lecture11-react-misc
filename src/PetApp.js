import React from 'react';
import _ from 'lodash';
import './pet-app.css'; //load CSS for this module

var SAMPLE_DOGS = [
  {name:'Fido', sex:'Male', breed:'Mix', img:'img/069b8257-f9db-4034-908f-12b8cea76693.jpg'},
  {name:'Spot', sex:'Female', breed:'Terrier', img:'img/78e41dd3-4216-47f1-9598-ea8220de354b.jpg'},
  {name:'Rover', sex:'Male', breed:'Mix', img:'img/e2e7ab9d-5a66-446d-8055-c9cc7cedc443.jpg'},
  {name:'Sparky', sex:'Female', breed:'Husky', img:'img/3c86b971-63b3-4b6e-859d-8e11084cca91.jpg'},
  {name:'Koi', sex:'Male', breed:'Hound', img:'img/234ed62e-c7fc-4f53-aa7d-c9e0ad76b9bb.jpg'},
];

class PetApp extends React.Component {
  constructor(props){
    super(props);

    //this ideally would be set up from a Controller
    this.state = {pets: SAMPLE_DOGS};
  }

  render() {
    //extract the breeds (thanks lodash!)
    var breeds = Object.keys(_.groupBy(this.state.pets, 'breed'));
    console.log(breeds);

    return (
      <div>
        <header className="well">
          <div className="container">
            <h1>Adopt a Pet</h1>
          </div>
        </header>
        <main className="container">
          <div className="row">
            <div className="col-xs-3">
              <Navigation breedList={breeds} /> {/*our component */}
            </div>
            <div className="col-xs-9">
              <DogGroup dogs={this.state.pets} /> {/*our component */}
            </div>
          </div>
        </main>
        <footer className="container">
          <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
        </footer>
      </div>
    );
  }
}

class DogGroup extends React.Component {

  render() {

    var dogCardArray = this.props.dogs.map(function(dogObj){
      return <DogCard dog={dogObj} key={dogObj.name} />
    });

    return (
      <div>
        <h2>Dogs for Adoption</h2>
        <div className="cards-container">
          {dogCardArray}
        </div>
      </div>        
    );
  }  
}

class DogCard extends React.Component {
  constructor(props){
    super(props);

    //the this refers to the new DogCard being constructed
    this.handleClick = this.handleClick.bind(this);
  }

  //called when I click on the card
  handleClick() { //this = ???
    console.log("You clicked on", this.props.dog.name);
  }

  render() {
    //this should have a this.props.dog (which is an object)
    return (
      <div className="card" onClick={this.handleClick} >
        <div className="content">
          <img src={this.props.dog.img} alt={this.props.dog.name} />
          <h3>{this.props.dog.name}</h3>
          <p>{this.props.dog.sex} {this.props.dog.breed}</p>
        </div>
      </div>
    );
  }    
}

class Navigation extends React.Component {
  render() {

    //should have this.props.breedList,
    //which will be an array of breeds

    return (
      <div>
        <BreedList breeds={this.props.breedList} /> {/*new BreedList(breeds = []) */}
        <AboutLinks />
      </div>
    );
  }  
}

class BreedList extends React.Component {
  render() {

      var breedLinksArray = this.props.breeds.map(function(breedStr){
        return <li key={breedStr}><a>{breedStr}</a></li>;
      });

    return (
        <nav>
          <h2>Pick a Breed</h2>
          <ul className="list-unstyled">
            {breedLinksArray}
          </ul>            
        </nav>
    );
  }  
}

class AboutLinks extends React.Component {
  render() {
    return (
        <nav>
          <h2>About</h2>
          <ul className="list-unstyled">
            <li><a>How to Adopt</a></li>
            <li><a>Volunteering</a></li>
            <li><a>Events</a></li>
            <li><a>Donate</a></li>
            <li><a>About Us</a></li>
          </ul>
        </nav>
    );
  }  
}

/*
  <App>
    <Navigation>
      <BreedList> << own component
      <AboutLinks>
    </Navigation
    <DogGroup >
      <DogCard>
      <DogCard>
      <DogCard>
      ...
    </DogGroup>
  </App>

*/








export default PetApp;
