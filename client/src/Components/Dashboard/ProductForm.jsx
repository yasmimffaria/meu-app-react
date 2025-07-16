import React, { useState } from 'react';
import '../Dashboard/cadastrarProduto.css';

const CadastrarProduto = ({ darkMode }) => {
    const [formData, setFormData] = useState({
        nome: '',
        preco: '',
        descricao: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Produto cadastrado:', formData);
        // Aqui você pode adicionar a lógica para salvar o produto
        alert('Produto cadastrado com sucesso!');
        setFormData({ nome: '', preco: '', descricao: '' });
    };

    return (
        <div className={`cadastrarProdutoContainer ${darkMode ? "dark" : "light"}`}>
            <div className="contentHeader">
                <h2>Cadastrar Produto</h2>
                <p>Adicione um novo produto ao sistema</p>
            </div>

            <form className={`form ${darkMode ? "dark" : "light"}`} onSubmit={handleSubmit}>
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
                    <button type="submit" className="btnPrimary">Cadastrar</button>
                    <button type="button" className="btnSecondary" onClick={() => setFormData({ nome: '', preco: '', descricao: '' })}>
                        Limpar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CadastrarProduto;