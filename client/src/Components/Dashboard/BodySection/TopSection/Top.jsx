import React from 'react';
import './top.css';
import { BiSearchAlt } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { MdOutlineNotificationsNone, MdOutlineFoodBank, MdAllInbox, MdDarkMode } from 'react-icons/md';
import { BsTruck, BsArrowDownShort } from 'react-icons/bs';
import img from '../../../../Assets/gilbert.jpg';

const Top = ({ darkMode, toggleTheme }) => {
  return (
    <div className={`topSection ${darkMode ? "dark" : "light"}`}>
      <div className="headerSection flex">
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

      <div className="contentSection grid">
        <div className="totalsCard">
          <div className="totalHeader">
            <h3>Valor total: R$ 500000</h3>
          </div>

          <div className="iconsSummary flex">
            <div className="iconCard yellow">
              <MdOutlineFoodBank size={30} />
              <p>Interno<br />32</p>
            </div>
            <div className="iconCard red">
              <MdAllInbox size={30} />
              <p>Retirada<br />16</p>
            </div>
            <div className="iconCard blue">
              <BsTruck size={30} />
              <p>Delivery<br />8</p>
            </div>
          </div>

          <div className="totalsList">
            <p className="totalItem red">Valor total: R$ 500000</p>
            <p className="totalItem blue">Valor total: R$ 500000</p>
          </div>
        </div>

        <div className="ordersCard">
          <div className="ordersHeader flex">
            <h3>Pedidos</h3>
            <button className="btn">Gerar Relatório</button>
          </div>

          <table className="ordersTable">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Horário</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* exemplo de linhas */}
              <tr>
                <td>Fauget Cafe</td>
                <td>Today<br />2m ago</td>
                <td>R$ 500<br />QR Code</td>
                <td className="status done">✓ Done</td>
              </tr>
              <tr>
                <td>Fauget Cafe</td>
                <td>Today<br />2m ago</td>
                <td>R$ 500<br />QR Code</td>
                <td className="status done">✓ Done</td>
              </tr>
              <tr>
                <td>Fauget Cafe</td>
                <td>Today<br />2m ago</td>
                <td>R$ 500<br />QR Code</td>
                <td className="status done">✓ Done</td>
              </tr>
              {/* outras linhas aqui... */}
            </tbody>
          </table>

          <div className="moreOrders flex">
            <span>Mais Pedidos</span>
            <BsArrowDownShort />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
