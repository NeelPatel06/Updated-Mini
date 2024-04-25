import React, { useState, useEffect } from 'react';
import fireDb from "../firebase";
import { Link } from 'react-router-dom';
import "./Home.css";
import { toast } from 'react-toastify';

const Home = () => {
    const [data, setData] = useState({});

  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  const handleChange = (e) => {
    setSort(true);
    fireDb
      .child("contacts")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };

  const handleReset = () => {
    setSort(false);
    //!Online Off back
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
      return () => {
        setData({});
      };
    });
  };

  const filterData = (value) => {
    fireDb
      .child("contacts")
      .orderByChild("status")
      .equalTo(value)
      .on("value", (snap) => {
        if (snap.val()) {
          const data = snap.val();
          setData(data);
        }
      });
  };
    
    // Typewriter effect state
    const [typewriterText, setTypewriterText] = useState("");
    const textToType = "Flash Cards - Your Study Mate !";

    useEffect(() => {
        // Typewriter effect implementation
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= textToType.length) {
                setTypewriterText(textToType.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100); // Adjust typing speed here

        // Fetching data from Firebase
        fireDb.child("contacts").on("value", (snapshot) => {
            if (snapshot.val() != null) {
                setData({ ...snapshot.val() });
            } else {
                setData({});
            }
        });

        return () => {
            setData({});
            clearInterval(typingInterval);
        };
    }, []);

    // Implementing Delete functionality
    const onDelete = (id) => {
        if (window.confirm("Are you sure to delete that data")) {
            fireDb.child(`contacts/${id}`).remove((err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Data deleted successfully");
                }
            })
        }
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <h2>{typewriterText}</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}> No. </th>
                        <th style={{ textAlign: "center" }}> Name </th>
                        <th style={{ textAlign: "center" }}> Question </th>
                        <th style={{ textAlign: "center" }}> Answer </th>
                        <th style={{ textAlign: "center" }}> Action </th>
                        {!sort && <td style={{ textAlign: "center" }}></td>}
                    </tr>
                </thead>
                {!sort && (
            <tbody>
              {Object.keys(data).map((id, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data[id].name}</td>
                    <td>{data[id].question}</td>
                    <td>{data[id].answer}</td>
                    <td>
                      <Link to={`/update/${id}`}>
                        <button className="bttn btn-edit">Edit</button>
                      </Link>
                      <button
                        className="bttn btn-delete"
                        onClick={() => onDelete(id)}
                      >
                        Delete
                      </button>
                      <Link to={`/view/${id}`}>
                        <button className="bttn btn-view">View</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
          {sort && (
            <tbody>
              {sortedData.map((id, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{id.name}</td>
                    <td>{id.question}</td>
                    <td>{id.answer}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
            <label>Sort by:</label>
            <select className="dropdown" name="colValue" onChange={handleChange}>
            <option value="">Please Select</option>
            <option value="name">Name</option>
            <option value="email">Question</option>
            <option value="contact">Answer</option>
            </select>
            <button className="btn btn-reset" onClick={handleReset}>
              Reset
            </button>
        </div>
    )
}

export default Home;
