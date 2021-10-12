import Tablerow from "./tablerow.jsx";

const MoviesTable = (props) => {
  const { movies, onDelete, onSort, renderSortIcon } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="clickable" onClick={() => onSort("title")}>
            Title {renderSortIcon("title")}
          </th>
          <th className="clickable" onClick={() => onSort("genre.name")}>
            Genre {renderSortIcon("genre.name")}
          </th>
          <th className="clickable" onClick={() => onSort("numberInStock")}>
            Stock {renderSortIcon("numberInStock")}
          </th>
          <th className="clickable" onClick={() => onSort("dailyRentalRate")}>
            Rate {renderSortIcon("dailyRentalRate")}
          </th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <Tablerow
            key={movie._id}
            title={movie.title}
            genre={movie.genre}
            stock={movie.numberInStock}
            rate={movie.dailyRentalRate}
            deleteHandler={() => onDelete(movie)}
          ></Tablerow>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
