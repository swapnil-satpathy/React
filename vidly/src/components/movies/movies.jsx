import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService.js";
import Tablerow from "./tablerow.jsx";
export class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  getNumberOfMovies = () => {
    if (this.state.movies.length === 0) {
      return <h1>There are no movies in the database</h1>;
    } else {
      return <h1>Showing {this.state.movies.length} movies in the database</h1>;
    }
  };
  // findIndex = (id) => {
  //   let i = 0;
  //   for (i = 0; i < this.state.movies.length; i++) {
  //     if (this.state.movies[i]._id === id) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // };

  onDeleteHandler = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // let index = this.findIndex(id);
    console.log(index);
    movies.splice(index, 1);
    // console.log(movies);

    // Simpler Way:
    // const movies=this.state.movies.filter(m => m._id!==id)
    this.setState({ movies: movies });
  };
  render() {
    return (
      <React.Fragment>
        {this.getNumberOfMovies()}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <Tablerow
                key={movie._id}
                title={movie.title}
                genre={movie.genre}
                stock={movie.numberInStock}
                rate={movie.dailyRentalRate}
                deleteHandler={() => this.onDeleteHandler(movie)}
              ></Tablerow>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
