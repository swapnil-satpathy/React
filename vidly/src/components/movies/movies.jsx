import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService.js";

import Pagination from "../common/pagination.jsx";
import { paginate } from "../../utils/paginate.js";
import ListGroup from "../common/listGroup.jsx";
import { getGenres } from "../../services/fakeGenreService.js";
import MoviesTable from "./moviesTable.jsx";
import _ from "lodash";
export class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

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
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  renderSortIcon = (path) => {
    const { sortColumn } = this.state;
    if (path !== sortColumn.path) {
      return null;
    } else {
      if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
      else return <i className="fa fa-sort-desc"></i>;
    }
  };
  render() {
    // First filter, then sort and then paginate the data
    const filtered =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            (m) => m.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;
    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          ></ListGroup>
        </div>
        <div className="col">
          <h1>There are {filtered.length} movies in the database</h1>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            renderSortIcon={this.renderSortIcon}
          ></MoviesTable>
          <Pagination
            itemsCount={filtered.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
