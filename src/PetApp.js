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
              <Navigation breedList={breeds} /> {/*my own component */}
            </div>
            <div className="col-xs-9">
              <DogAdoptions dogs={this.state.pets} /> {/*my own component */}
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

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <BreedList breeds={this.props.breedList}/>
        {/* new BreedList(breeds = [...]) */}
        <AboutLinks />
      </div>
    );
  }  
}

class BreedList extends React.Component {
  render() {

    //for now
    var theListOfBreeds = this.props.breeds;

    var breedItemsArray = theListOfBreeds.map(function(breedStr){
      return <li key={breedStr}><a>{breedStr}</a></li>;
    })
    //["Hound", "Mix", "Husky"]
    // => [<li><a>Hound</a></li>, ...]

    return (
      <nav>
        <h2>Pick a Breed</h2>
        <ul className="list-unstyled">
          {breedItemsArray}
        </ul>            
      </nav>      
    );
  }  
}

class AboutLinks extends React.Component {
  render() {
    return (
      null
    );
  }  
}

class DogAdoptions extends React.Component {
  render() {
    //want to have a prop called "dogs"
    var dogCardsArray = this.props.dogs.map(function(dogObj){
      return <DogCard dog={dogObj} key={dogObj.name} />
    });

    return (
      <div>
        <h2>Dogs for Adoption</h2>
        <div className="cards-container">
          {dogCardsArray}
        </div>
      </div>
    );
  }  
}

class DogCard extends React.Component {
  constructor(props){
    super(props);

    //`this` refers to this new card

    //this.name = this.name.toUpperCase();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('You clicked on', this.props.dog.name);
  }

  render() {

    //want a variable this.props.dog

    return (
        <div className="card" onClick={this.handleClick}>
          <div className="content">
            <img src={this.props.dog.img} alt={this.props.dog.name} />
            <h3>{this.props.dog.name}</h3>
            <p>{this.props.dog.sex} {this.props.dog.breed}</p>
          </div>
        </div>
    );
  }  
}


/*
  <App>
    <Navigation>
      <BreedList>
      <AboutLinks>
    </Navigation

    <DogAdoptions>
      <DogCard>
      <DogCard>
      <DogCard>
      ...
    </DogAdoptions>
  </App>
*/




export default PetApp;
