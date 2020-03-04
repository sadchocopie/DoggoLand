import React from "react";
import FetchRandomDog from "./components/FetchRandomDog";
import Select from "./components/Select";

export default class App extends React.Component {
  state = {
    breedsList: null,
    selectedBreed: "affenpinscher",
    error: false
  };

  componentDidMount() {
    this.fetchAllBreeds();
  }

  handleChange = e => {
    this.setState({ selectedBreed: e.target.value });
  };

  fetchAllBreeds = async () => {
    try {
      //try to get data
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      if (response.ok) {
        const data = await response.json();
        this.setState({
          breedsList: Object.keys(data.message)
        });
      } else {
        this.setState({
          error: true
        });
        alert("error");
      }
    } catch (e) {
      this.setState({
        error: true
      });
      alert("exception");
    }
  };

  selectHandler = breed => {
    this.setState({
      selectedBreed: breed
    });
  };

  render() {
    var message = `${
      this.state.selectedBreed
    }? You chose well! Scroll down to see more!`;

    return (
      <div>
        <div className="banner">
          <h1>｡*ﾟ✲*☆DoggoLand｡*ﾟ✲*☆</h1>

          <Select
            breedsList={this.state.breedsList}
            onSelect={this.selectHandler}
            isError={this.state.error}
          />
        </div>

        <div className="feed">
          <p>{message}</p>
          <FetchRandomDog breed={this.state.selectedBreed} />
        </div>
      </div>
    );
  }
}
