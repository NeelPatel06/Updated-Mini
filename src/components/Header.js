import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const location = useLocation();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('Home');
    } else if (location.pathname === '/add') {
      setActiveTab('addCard');
    } else if (location.pathname === '/about') {
      setActiveTab('About');
    } else if (location.pathname === '/signin') {
      setActiveTab('Signin');
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?name=${search}`);
    setSearch('');
  };

  return (
    <div className="Header">
      <img src="https://www.shahandanchor.com/dims/image/logo.jpeg" alt="Logo" />
      <p className="logo">Flash Cards</p>
      <div className="header-right">
        <form onSubmit={handleSubmit} style={{display: "inline"}}>
          <input
            type="text"
            className="inputField"
            placeholder="Search Name ..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <Link to="/">
          <p
            className={`${activeTab === 'Home' ? 'active-golden' : ''}`}
            onClick={() => setActiveTab('Home')}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === 'addCard' ? 'active-golden' : ''}`}
            onClick={() => setActiveTab('addCard')}
          >
            Add Card
          </p>
        </Link>
        <Link to="/about">
          <p
            className={`${activeTab === 'About' ? 'active-golden' : ''}`}
            onClick={() => setActiveTab('About')}
          >
            About US
          </p>
        </Link>
        <Link to="/signin">
          <p
            className={`${activeTab === 'Signin' ? 'active-golden' : ''}`}
            onClick={() => setActiveTab('Signin')}
          >
            Sign in
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
