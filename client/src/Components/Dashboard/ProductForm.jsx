import React, { useState, useEffect } from "react";
import "./cadastrarProduto.css";

const CadastrarProduto = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    qtd: "",
    descricao: "",
  });

  const [produtos, setProdutos] = useState([]);

  // Carrega produtos do localStorage ao iniciar
  useEffect(() => {
    const produtosSalvos = localStorage.getItem("produtos");
    if (produtosSalvos) {
      setProdutos(JSON.parse(produtosSalvos));
    }
  }, []);

  // Salva produtos sempre que a lista muda
  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
  }, [produtos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoProduto = { ...formData };
    setProdutos((prev) => [...prev, novoProduto]);
    alert("Produto cadastrado com sucesso!");
    setFormData({ nome: "", preco: "", descricao: "" });
  };

  return (
    <div className={`cadastrarProdutoContainer ${darkMode ? "dark" : "light"}`}>
      <div className="formCard">
        <div className="contentHeader">
          <h2>Cadastrar Produto</h2>
          <p>Adicione um novo produto ao sistema</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Nome do Produto</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Ex: X-Burger"
              required
            />
          </div>

          <div className="formGroup">
            <label>Preço</label>
            <input
              type="number"
              name="preco"
              value={formData.preco}
              onChange={handleInputChange}
              placeholder="Ex: 25.00"
              step="0.01"
              required
            />
          </div>
          <div className="formGroup">
            <label>Quantidade</label>
            <input
              type="number"
              name="qtd"
              value={formData.qtd}
              onChange={handleInputChange}
              placeholder="Ex: 1"
              required
            />
          </div>

          <div className="formGroup">
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              placeholder="Descreva o produto"
              rows="4"
              required
            />
          </div>

          <div className="formActions">
            <button type="submit" className="btnPrimary">
              Cadastrar
            </button>
            <button
              type="button"
              className="btnSecondary"
              onClick={() =>
                setFormData({ nome: "", preco: "", descricao: "" })
              }
            >
              Limpar
            </button>
          </div>
        </form>
      </div>

      {/* TABELA DE PRODUTOS */}
      {produtos.length > 0 && (
        <div className="tabelaCard">
          <h3>Produtos Cadastrados</h3>
          <table className="produtosTable">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço (R$)</th>
                <th>Quantidade</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.nome}</td>
                  <td>{parseFloat(produto.preco).toFixed(2)}</td>
                  <td>{parseInt(produto.qtd)}</td>
                  <td>{produto.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CadastrarProduto;
