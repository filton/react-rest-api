import React, { useState } from "react";
import UserDetails from "./GitHubUser/UserDetails.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const onChangeQuery = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setUser(null);

    if (!query) {
      setMessage("Please enter a search term!");
      return;
    }

    setMessage("");
    setIsSearching(true);

    getUser()
      .then(() => getRepos())
      .finally(() => setIsSearching(false));
  };

  function getUser() {
    return fetch(`https://api.github.com/users/${query}`)
      .then((response) => response.json())
      .then((result) => {
        if (!result || !result.id) {
          setMessage(result.message || "No results found.");
        } else {
          console.log(result);
          setUser(result);
        }
        return result;
      })
      .catch((error) => setMessage(error.message));
  }

  function getRepos() {
    return fetch(`https://api.github.com/users/${query}/repos`)
      .then((response) => response.json())
      .then((result) => {
        if (!result || !result.length > 0) {
          console.log("No repos found.", result);
          setRepos([]);
        } else {
          console.log(result);
          setRepos(result);
        }
        return result;
      })
      .catch((error) => setRepos([]));
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Type to search username..."
          value={query}
          onChange={onChangeQuery}
        />
        <button type="submit" disabled={!query}>Search</button>
      </form>
      {isSearching && <p>Searching...</p>}
      {message && <p>{message}</p>}

      {user && (
        <UserDetails
          avatar_url={user.avatar_url}
          name={user.name}
          location={user.location}
          bio={user.bio}
          repos={repos}
        />
      )}
    </div>
  );
}
