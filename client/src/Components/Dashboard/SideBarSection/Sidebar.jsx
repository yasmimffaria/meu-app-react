import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
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

const Sidebar = ({ darkMode }) => {
  return (
    <div className={`sideBar grid ${darkMode ? "dark" : "light"}`}>
      <div className="logoDiv flex">
        <img src={logo} alt="Logo" />
        <h2>Gestor de Pedidos</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">MENU</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <IoMdSpeedometer className="icon" />
              <span className="smallText">Dashboard</span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <MdDeliveryDining className="icon" />
              <span className="smallText">Simular Pedido</span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <MdOutlinePermContactCalendar className="icon" />
              <span className="smallText">Cadastrar Funcionario</span>
            </a>
          </li>
          <li className="listItem">
          <Link to="/cadastrar-produto" className="menuLink flex">
            <BsCreditCard2Front className="icon" />
            <span className="smallText">Cadastrar Produto</span>
          </Link>
        </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <AiOutlinePieChart className="icon" />
              <span className="smallText">Alerta Estoque</span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <BiTrendingUp className="icon" />
              <span className="smallText">Comissão</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
