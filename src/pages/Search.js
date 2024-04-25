import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Search.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";

const Search = () => {
  const [data, setData] = useState({});
  const [sortOrder, setSortOrder] = useState("asc"); // Initial sorting order is ascending
  const [sortBy, setSortBy] = useState("name"); // Initial sorting field is name
  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete ")) {
      fireDb.child(`contacts/${id}`).remove((error) => {
        if (error) {
          toast.error("You delete Fail ");
        } else {
          toast.success("You delete success ");
        }
      });
    }
  };
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  let search = query.get("name"); 
  console.log(search);

  const searchData = () => {
    const lowercaseSearch = search.toLowerCase(); // Convert search term to lowercase

    fireDb.child("contacts").once("value", (snapshot) => {
      const data = snapshot.val() || {};

      // Filter data based on the search term (case insensitive and partial name search)
      const filteredData = Object.keys(data)
        .filter((id) => {
          const item = data[id];
          const lowercaseName = item.name.toLowerCase();
          return (
            lowercaseName.includes(lowercaseSearch) ||
            item.email.toLowerCase().includes(lowercaseSearch) ||
            item.contact.toLowerCase().includes(lowercaseSearch)
          );
        })
        .reduce((obj, id) => {
          obj[id] = data[id];
          return obj;
        }, {});

      // Sort the filtered data
      const sortedData = sortData(filteredData, sortBy, sortOrder);
      setData(sortedData);
    });
  };

  const sortData = (data, field, order) => {
    const sortedArray = Object.entries(data).sort((a, b) => {
      const aValue = a[1][field].toLowerCase();
      const bValue = b[1][field].toLowerCase();

      if (order === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return Object.fromEntries(sortedArray);
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      // Toggle the sorting order if the same field is clicked again
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set the sorting field and default to ascending order
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    searchData();
  }, [search, sortBy, sortOrder]);

  return (
    <div style={{ marginTop: "100px" }}>
      <Link to="/">
        <button className="btn btn-search1">Go Back 🔙</button>
      </Link>
      {Object.keys(data).length === 0 ? (
        <h2>No Search Found With that Name : {search}</h2>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <td style={{ textAlign: "center" }}>
                <button onClick={() => handleSort("name")}>
                  Name {sortBy === "name" && `(${sortOrder === "asc" ? "A-Z" : "Z-A"})`}
                </button>
              </td>
              <td style={{ textAlign: "center" }}>
                <button onClick={() => handleSort("email")}>
                  Email {sortBy === "email" && `(${sortOrder === "asc" ? "A-Z" : "Z-A"})`}
                </button>
              </td>
              <td style={{ textAlign: "center" }}>
                <button onClick={() => handleSort("contact")}>
                  Contact {sortBy === "contact" && `(${sortOrder === "asc" ? "A-Z" : "Z-A"})`}
                </button>
              </td>
              <td style={{ textAlign: "center" }}>Action</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={index}>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="bttn btn-edit">Edit</button>
                    </Link>
                    <button className="bttn btn-delete" onClick={() => onDelete(id)}>
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
        </table>
      )}
    </div>
  );
};

export default Search;
