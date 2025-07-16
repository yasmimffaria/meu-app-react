import React, { useState } from "react";
import "./SimularPedido.css";
import produtoImg from "../../Assets/logo.png"; // sua imagem

const SimularPedido = ({ darkMode }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState({
    codproduto: "",
    funcionario: "",
    qtd: "",
    opcap: "", // interno, retirada ou delivery
    comissao: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimular = () => {
    setMostrarFormulario(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pedido simulado:", formData);
    alert("Pedido simulado com sucesso!");
    setFormData({
      codproduto: "",
      funcionario: "",
      qtd: "",
      opcap: "",
      comissao: "",
      status: "",
    });
    setMostrarFormulario(false);
  };

  return (
    <div className={`simularPedidoContainer ${darkMode ? "dark" : "light"}`}>
      <div className="produtoCard">
        <img src={produtoImg} alt="Produto" />
        <h3>Simulador de Pedido</h3>
        <button className="btnSimular" onClick={handleSimular}>
          Simular Pedido
        </button>
      </div>

      {mostrarFormulario && (
        <form className="formSimulador" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Código do Produto</label>
            <input
              type="text"
              name="codproduto"
              value={formData.codproduto}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Funcionário</label>
            <input
              type="text"
              name="funcionario"
              value={formData.funcionario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Quantidade</label>
            <input
              type="number"
              name="qtd"
              value={formData.qtd}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="formGroup">
            <label>Tipo de Pedido</label>
            <select
              name="opcap"
              value={formData.opcap}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="interno">Interno</option>
              <option value="retirada">Retirada</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>

          {formData.opcap === "interno" && (
            <div className="formGroup">
              <label>Comissão (%)</label>
              <input
                type="number"
                name="comissao"
                value={formData.comissao}
                onChange={handleChange}
                placeholder="Ex: 5"
                required
              />
            </div>
          )}

          <div className="formGroup">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="feito">Feito</option>
              <option value="preparo">Preparo</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>

          <div className="formActions">
            <button type="submit" className="btnPrimary">
              Confirmar Simulação
            </button>
            <button
              type="button"
              className="btnSecondary"
              onClick={() => setMostrarFormulario(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SimularPedido;
