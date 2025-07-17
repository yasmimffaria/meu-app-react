import React, { useState, useEffect } from 'react';
import { MdOutlineFoodBank, MdAllInbox, MdDarkMode } from 'react-icons/md';
import { BsTruck, BsArrowDownShort } from 'react-icons/bs';

const Top = ({ darkMode, toggleTheme }) => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    totalValue: 0,
    interno: { count: 0, total: 0 },
    retirada: { count: 0, total: 0 },
    delivery: { count: 0, total: 0 }
  });

  const [editandoStatusId, setEditandoStatusId] = useState(null);
  const [novoStatus, setNovoStatus] = useState('');

  useEffect(() => {
    const savedOrders = localStorage.getItem('pedidosSimulados');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        const normalizados = parsedOrders.map((pedido) => ({
          ...pedido,
          produto: typeof pedido.produto === 'string'
              ? JSON.parse(pedido.produto)
              : pedido.produto
        }));
        setOrders(normalizados);
      } catch (error) {
        console.error('Erro ao carregar pedidos do localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    const newSummary = {
      totalValue: 0,
      interno: { count: 0, total: 0 },
      retirada: { count: 0, total: 0 },
      delivery: { count: 0, total: 0 }
    };

    orders.forEach(order => {
      const qtd = parseInt(order.qtd);
      const preco = parseFloat(order.produto?.preco || 0);
      const valorTotal = qtd * preco;

      newSummary.totalValue += valorTotal;

      if (order.opcap === 'interno') {
        newSummary.interno.count += qtd;
        newSummary.interno.total += valorTotal;
      } else if (order.opcap === 'retirada') {
        newSummary.retirada.count += qtd;
        newSummary.retirada.total += valorTotal;
      } else if (order.opcap === 'delivery') {
        newSummary.delivery.count += qtd;
        newSummary.delivery.total += valorTotal;
      }
    });

    setSummary(newSummary);
  }, [orders]);

  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString.replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1T$4:$5:$6'));
      const now = new Date();
      const diff = Math.floor((now - date) / 60000);
      return diff < 60 ? `Hoje\n${diff}min atrás` : `Hoje\n${Math.floor(diff / 60)}h atrás`;
    } catch (error) {
      return dateString;
    }
  };

  const getStatusDisplay = (status) => {
    const normalized = status?.toLowerCase().trim();
    if (['feito'].includes(normalized)) return { text: '✓ Aceito', className: 'done' };
    if (['concluido'].includes(normalized)) return { text: '✓ Concluído', className: 'done' };
    if (['preparando', 'preparo'].includes(normalized)) return { text: '⏳ Preparando', className: 'preparing' };
    if (['pendente', 'espera'].includes(normalized)) return { text: '⏸ Pendente', className: 'pending' };
    return { text: '❓ Indefinido', className: 'undefined' };
  };

  const handleEditarStatus = (id, statusAtual) => {
    setEditandoStatusId(id);
    setNovoStatus(statusAtual);
  };

  const handleSalvarStatus = (id) => {
    const pedidosAtualizados = orders.map((pedido) =>
        pedido.id === id ? { ...pedido, status: novoStatus } : pedido
    );
    setOrders(pedidosAtualizados);
    localStorage.setItem('pedidosSimulados', JSON.stringify(pedidosAtualizados));
    setEditandoStatusId(null);
  };

  const handleCancelarEdicao = () => {
    setEditandoStatusId(null);
  };

  return (
      <div className={`topSection ${darkMode ? "dark" : "light"}`} style={{ padding: '20px' }}>
        <div className="contentSection grid">
          <div className="totalsCard">
            <div className="totalHeader">
              <h3>Valor total: R$ {summary.totalValue.toFixed(2)}</h3>
            </div>
            <div className="iconsSummary flex" style={{ display: 'flex', gap: '15px', margin: '20px 0' }}>
              <div className="iconCard yellow" style={{ backgroundColor: '#ffd700', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                <MdOutlineFoodBank size={30} />
                <p>Interno<br />{summary.interno.count}</p>
              </div>
              <div className="iconCard red" style={{ backgroundColor: '#ff6b6b', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                <MdAllInbox size={30} />
                <p>Retirada<br />{summary.retirada.count}</p>
              </div>
              <div className="iconCard blue" style={{ backgroundColor: '#4ecdc4', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                <BsTruck size={30} />
                <p>Delivery<br />{summary.delivery.count}</p>
              </div>
            </div>
          </div>

          <div className="ordersCard">
            <div className="ordersHeader flex">
              <h3>Pedidos</h3>
              <button className="btn">Gerar Relatório</button>
            </div>

            <table className="ordersTable" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th>Nome</th>
                <th>Horário</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
              </thead>
              <tbody>
              {orders.map((order) => {
                const preco = parseFloat(order.produto?.preco || 0);
                const qtd = parseInt(order.qtd);
                const total = preco * qtd;
                const statusDisplay = getStatusDisplay(order.status);

                return (
                    <tr key={order.id}>
                      <td>
                        {order.produto?.nome}<br />
                        <small>Qtd: {qtd} | {order.opcap}</small>
                      </td>
                      <td>{formatTime(order.dataSimulacao)}</td>
                      <td>R$ {total.toFixed(2)}<br /><small>Unit: R$ {preco}</small></td>
                      <td>
                        {editandoStatusId === order.id ? (
                            <select value={novoStatus} onChange={(e) => setNovoStatus(e.target.value)}>
                              <option value="preparo">Preparando</option>
                              <option value="feito">Aceito</option>
                              <option value="concluido">Concluído</option>
                              <option value="pendente">Pendente</option>
                              <option value="cancelado">Cancelado</option>
                            </select>
                        ) : (
                            <span className={`status ${statusDisplay.className}`} style={{ color:
                                  statusDisplay.className === 'done' ? '#28a745' :
                                      statusDisplay.className === 'preparing' ? '#ffc107' :
                                          statusDisplay.className === 'pending' ? '#dc3545' : '#6c757d'
                            }}>
                          {statusDisplay.text}
                        </span>
                        )}
                      </td>
                      <td>
                        {editandoStatusId === order.id ? (
                            <>
                              <button
                                  onClick={() => handleSalvarStatus(order.id)}
                                  style={{
                                    backgroundColor: '#ff8c00',
                                    color: '#fff',
                                    padding: '5px 10px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginRight: '5px',
                                    fontSize: '0.85rem'
                                  }}
                              >
                                Salvar
                              </button>

                              <button
                                  onClick={handleCancelarEdicao}
                                  style={{
                                    backgroundColor: '#cc5500',
                                    color: '#fff',
                                    padding: '5px 10px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                  }}
                              >
                                Cancelar
                              </button>
                            </>
                        ) : (
                            <button
                                onClick={() => handleEditarStatus(order.id, order.status)}
                                style={{
                                  backgroundColor: '#ffa500',
                                  color: '#fff',
                                  padding: '5px 10px',
                                  border: 'none',
                                  borderRadius: '5px',
                                  cursor: 'pointer',
                                  fontSize: '0.85rem'
                                }}
                            >
                              Editar
                            </button>
                        )}
                      </td>
                    </tr>
                );
              })}
              </tbody>
            </table>

            <div className="moreOrders flex" style={{ justifyContent: 'center', marginTop: '10px' }}>
              <span>Mais Pedidos ({orders.length})</span>
              <BsArrowDownShort />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Top;
