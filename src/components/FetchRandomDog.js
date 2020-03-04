import React from "react";
import LoadingGif from "../assets/loading.gif";

export default class FetchRandomDog extends React.Component {
  state = {
    loading: true,
    dogs: [],
    selectedBreed: null
  };

  async loadDoggo() {
    let nonRepeats = [];
    if (this.props.breed) {
      const selectedUrl = `https://dog.ceo/api/breed/${
        this.props.breed
      }/images/random/10`;
      let response;
      try {
        response = await fetch(selectedUrl);
      } catch (ex) {
        alert("exception");
      }
      if (!response.ok) {
        return alert(` error ${response.status}`);
      } else {
        const data = await response.json();

        data.message.forEach((doggo, i) => {
          // push to array only if non-duplicate
          if (this.state.dogs.indexOf(doggo) === -1) {
            nonRepeats = nonRepeats.slice().concat(doggo);
          }
        });

        this.setState({
          // dogs: this.state.dogs.slice().concat(data.message),
          dogs: [...this.state.dogs, ...nonRepeats],
          loading: false
        });
      }
    }
  }

  handleScroll = () => {
    const list = document.querySelector("ul#list:last-child");
    var lastLiOffset = list.offsetTop + list.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastLiOffset) {
      this.loadDoggo();
    }
  };

  componentDidMount() {
    this.loadDoggo();
    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  componentDidUpdate() {
    if (this.props.breed !== this.state.selectedBreed) {
      this.setState({
        dogs: [],
        selectedBreed: this.props.breed,
        loading: true
      });
      this.loadDoggo();
    }
  }

  render() {
    return (
      <div>
        {this.state.loading || !this.state.dogs ? (
          <div className="loading">
            <img className="loading-gif" alt="Loading..." src={LoadingGif} />
          </div>
        ) : (
          <ul id="list">
            {this.state.dogs.map((doggo, i) => {
              return (
                <li
                  className="loaded-section"
                  id="img-container"
                  key={i}
                  style={{ backgroundImage: `url(${doggo})` }}
                />
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
