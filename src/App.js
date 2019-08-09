import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './Home';
import Films from './Films';
import Series from './Series';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      films: null,
      series: null,
      video: null,
    }
  }

  scrollToVideoPlayer() {
    let elmnt = document.getElementById("video-player");
    elmnt.scrollIntoView(); 
  }

  componentDidMount() {
    let max = 29, min = 0;
    fetch('https://api.myjson.com/bins/1gast9')
    .then(response =>  response.json())
    .then(resData => {
       this.setState({films: resData, film: resData[Math.round(Math.random() * (max - min) + min)]});
       this.setState({video: resData[Math.round(Math.random() * (max - min) + min)]})
    })
    fetch('https://api.myjson.com/bins/1f953p')
    .then(response =>  response.json())
    .then(resData => {
       this.setState({series: resData, serie: resData[Math.round(Math.random() * (max - min) + min)]});    
    });
  }

  onFilmChange = (film) => {
    this.setState({film});
    this.scrollToVideoPlayer();
  }

  onSerieChange = (serie) => {
    this.setState({serie});
    this.scrollToVideoPlayer();
  }

  render() {
    return (
      <div className="main-container">
        <Router>
          <div className="navbar" id="navbar">
            <span className="navbar-brand">
              Movie X
            </span>
            <span className="navbar-links">
              <Link style={{ textDecoration: 'none', color: 'rgb(219, 219, 219)'}} to="/moviex-react">
                <span className="navbar-links-home">Home</span>
              </Link>
              <Link style={{ textDecoration: 'none', color: 'rgb(219, 219, 219)'}} to="/films">
                <span className="navbar-links-home">Films</span>
              </Link>
              <Link style={{ textDecoration: 'none', color: 'rgb(219, 219, 219)'}} to="/series">
                <span className="navbar-links-home">Series</span>
              </Link>
            </span>
          </div>
          <hr/>        
            <div className="sub-container">
              <Route exact path="/moviex-react" component={() => 
                                      <Home 
                                        video={this.state.video} 
                                        films={this.state.films} 
                                        onFilmChange={this.onFilmChange} 
                                        onSerieChange={this.onSerieChange} 
                                        series={this.state.series} 
                                        scrollToVideoPlayer={this.scrollToVideoPlayer}
                                      />} 
              />
              <Route path="/films" component={() => 
                                    <Films 
                                      films={this.state.films} 
                                      film={this.state.film} 
                                      onFilmChange={this.onFilmChange} 
                                    />} 
              />
              <Route path="/series" component={() => 
                                      <Series 
                                        series={this.state.series} 
                                        serie={this.state.serie} 
                                        onSerieChange={this.onSerieChange} 
                                      />} 
              />
            </div>
          </Router>
          <div className="footer-note">{`Media source: Google/YouTube. Not intended for commercial use. May subject to copyright.`}</div>
      </div>
    );
  }
}