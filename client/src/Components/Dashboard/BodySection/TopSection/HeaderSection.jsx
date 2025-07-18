import React, { useEffect, useState } from 'react';
import './top.css';
import { BiSearchAlt } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { MdOutlineNotificationsNone, MdDarkMode } from 'react-icons/md';
import Badge from '@mui/material/Badge';

const HeaderSection = ({ darkMode, toggleTheme }) => {
    const [alertCount, setAlertCount] = useState(0);
    const [showAlerts, setShowAlerts] = useState(false);
    const [produtosComEstoqueBaixo, setProdutosComEstoqueBaixo] = useState([]);

    useEffect(() => {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        const baixos = produtos.filter(prod => parseInt(prod.qtd) <= 0);
        setAlertCount(baixos.length);
        setProdutosComEstoqueBaixo(baixos);
    }, []);

    const handleNotificationClick = () => {
        setShowAlerts(!showAlerts);
    };

    return (
        <div className={`headerSection flex ${darkMode ? "dark" : "light"}`}>
            <div className="title">
                <h1>Bem vindo!</h1>
                <p>Ao gerenciador de pedidos!</p>
            </div>
            <div className="adminDiv flex" style={{ position: 'relative' }}>
                <Badge badgeContent={alertCount} color="error">
                    <MdOutlineNotificationsNone className="icon" onClick={handleNotificationClick} style={{ cursor: 'pointer' }} />
                </Badge>
                <MdDarkMode className="icon" onClick={toggleTheme} />

                {showAlerts && (
                    <div className="alertsDropdown" style={{
                        position: 'absolute',
                        top: '50px',
                        right: 0,
                        background: darkMode ? '#333' : '#fff',
                        color: darkMode ? '#fff' : '#000',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        minWidth: '220px',
                        zIndex: 10,
                        padding: '15px'
                    }}>
                        <h4 style={{ margin: '0 0 10px 0' }}>Estoque baixo</h4>
                        {produtosComEstoqueBaixo.length === 0 ? (
                            <p style={{ fontSize: '0.95rem' }}>Nenhum produto com estoque zerado.</p>
                        ) : (
                            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                                {produtosComEstoqueBaixo.map((prod, idx) => (
                                    <li key={idx} style={{ marginBottom: '8px', fontSize: '0.95rem' }}>
                                        <strong>{prod.nome}</strong> - Qtd: {prod.qtd}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderSection;
