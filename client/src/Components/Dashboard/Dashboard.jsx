import React, { useState } from 'react';
import '../../App.css';
import Sidebar from '../Dashboard/SideBarSection/Sidebar';
import Body from '../Dashboard/BodySection/Body';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : "light"}`}>
      <div className="dashboardContainer flex">
        <Sidebar darkMode={darkMode} />
        <Body darkMode={darkMode} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default Dashboard;
