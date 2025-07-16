import React from 'react';
import '../Dashboard/cadastrarProduto.css'; // opcional para estilos

const CadastrarProduto = ({ darkMode }) => {
  return (
    <div className="cadastrarProdutoContainer">
      <h2>Cadastrar Produto</h2>
      <form className={`form ${darkMode ? "dark" : "light"}`}>
        <label>Nome do Produto</label>
        <input type="text" placeholder="Ex: X-Burger" />

        <label>Preço</label>
        <input type="number" placeholder="Ex: 25.00" />

        <label>Descrição</label>
        <textarea placeholder="Descreva o produto" />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarProduto;
