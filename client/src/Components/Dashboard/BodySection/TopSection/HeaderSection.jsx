// HeaderSection.jsx
import React from 'react';
import './top.css';
import { BiSearchAlt } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { MdOutlineNotificationsNone, MdDarkMode } from 'react-icons/md';

const HeaderSection = ({ darkMode, toggleTheme }) => {
  return (
    <div className={`headerSection flex ${darkMode ? "dark" : "light"}`}>
      <div className="title">
        <h1>Bem vindo!</h1>
        <p>Ao gerenciador de pedidos!</p>
      </div>

      <div className="searchBar flex">
        <input type="text" placeholder='Search Dashboard' />
        <BiSearchAlt className="icon" />
      </div>

      <div className="adminDiv flex">
        <TbMessageCircle className="icon" />
        <MdOutlineNotificationsNone className="icon" />
        <MdDarkMode className="icon" onClick={toggleTheme} />
      </div>
    </div>
  );
};

export default HeaderSection;
