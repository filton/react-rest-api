import React from "react";

export default function UserRepositories(props) {
  const repos = props.repos;

  if (!repos || repos.length < 1) {
    return <div>This user has no repos.</div>;
  }

  return (
    <div className="repositories-container">
      <div><b>Repositories: </b></div>
      <div>
        {repos.map((r) => {
          return (
            <div className="repositories" key={r.id}>
              <div><b>Id: </b>{r.id}</div>
              <div><b>Name: </b>{r.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
