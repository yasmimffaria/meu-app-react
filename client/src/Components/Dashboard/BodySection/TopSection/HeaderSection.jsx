import React, { useEffect, useState } from 'react';
import './top.css';
import { BiSearchAlt } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { MdOutlineNotificationsNone, MdDarkMode } from 'react-icons/md';
import Badge from '@mui/material/Badge';

const HeaderSection = ({ darkMode, toggleTheme }) => {
    const [alertCount, setAlertCount] = useState(0);

    useEffect(() => {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        const produtosComEstoqueBaixo = produtos.filter(prod => parseInt(prod.qtd) <= 0);
        setAlertCount(produtosComEstoqueBaixo.length);
    }, []);

    return (
        <div className={`headerSection flex ${darkMode ? "dark" : "light"}`}>
            <div className="title">
                <h1>Bem vindo!</h1>
                <p>Ao gerenciador de pedidos!</p>
            </div>
            <div className="adminDiv flex">
                <Badge badgeContent={alertCount} color="error">
                    <MdOutlineNotificationsNone className="icon" />
                </Badge>

                <MdDarkMode className="icon" onClick={toggleTheme} />
            </div>
        </div>
    );
};

export default HeaderSection;
