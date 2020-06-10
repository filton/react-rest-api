import React from "react";
import PropTypes from "prop-types";
import UserRepositories from "./UserRepositories.jsx";
import "../style.css";

export default class UserDetails extends React.Component {
  render() {
    const { avatar_url, name, location, bio, repos } = this.props;

    return (
      <div className="results">
        <img src={avatar_url} alt="logo"></img>
        <div><b>Name: </b>{name || "-"}</div>
        <div><b>Location: </b>{location || "-"}</div>
        <div><b>Bio: </b>{bio || "-"}</div>
        <UserRepositories repos={repos || []} />
      </div>
    );
  }
}

UserDetails.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  bio: PropTypes.string,
  repos: PropTypes.arrayOf(PropTypes.shape),
};
