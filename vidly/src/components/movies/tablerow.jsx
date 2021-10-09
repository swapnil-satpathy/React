import React, { Component } from "react";

export class Tablerow extends Component {
  render() {
    return (
      <tr>
        {this.props.key}
        <td>{this.props.title}</td>
        <td>{this.props.genre.name}</td>
        <td>{this.props.stock}</td>
        <td>{this.props.rate}</td>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={this.props.deleteHandler}
        >
          Delete
        </button>
      </tr>
    );
  }
}

export default Tablerow;
