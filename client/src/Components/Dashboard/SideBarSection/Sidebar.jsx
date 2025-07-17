import React from 'react';
import './sidebar.css';
import logo from '../../../Assets/logo.png';
import {
  IoMdSpeedometer,
  MdDeliveryDining,
  MdOutlinePermContactCalendar,
  BsCreditCard2Front,
  AiOutlinePieChart,
  BiTrendingUp,
  BiLogOutCircle,
  BsQuestionCircle
} from 'react-icons/all';

const Sidebar = ({ darkMode, activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: IoMdSpeedometer },
    { id: 'simular-pedido', label: 'Simular Pedido', icon: MdDeliveryDining },
    { id: 'cadastrar-produto', label: 'Cadastrar Produto', icon: BsCreditCard2Front },
    { id: 'alerta-estoque', label: 'Alerta Estoque', icon: AiOutlinePieChart },
    { id: 'comissao', label: 'Comissão', icon: BiTrendingUp },
  ];

  return (
      <div className={`sideBar grid ${darkMode ? "dark" : "light"}`}>
        <div className="logoDiv flex">
          <img src={logo} alt="Logo" />
          <h2>Gestor de Pedidos</h2>
        </div>
        <div className="menuDiv">
          <h3 className="divTitle">MENU</h3>
          <ul className="menuLists grid">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                  <li key={item.id} className="listItem">
                    <a
                        href="#"
                        className={`menuLink flex ${activeSection === item.id ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSection(item.id);
                        }}
                    >
                      <Icon className="icon" />
                      <span className="smallText">{item.label}</span>
                    </a>
                  </li>
              );
            })}
          </ul>
        </div>
      </div>
  );
};

export default Sidebar;