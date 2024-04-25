import React, { useState, useEffect } from 'react';
import fireDb from "../firebase";
import { useParams, Link } from 'react-router-dom';
import "./View.css"

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  // using useEffect on specific id
  useEffect(() => {
    fireDb.child(`contacts/${id}`).get().then((snapshot) => {
      if (snapshot.exists()) {
        setUser({ ...snapshot.val() });
      }
      else {
        setUser({});
      }
    });
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Card Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Question: </strong>
          <span>{user.question}</span>
          <br />
          <br />
          <strong>Answer: </strong>
          <span>{user.answer}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View;
