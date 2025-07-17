import React, { useEffect, useState } from "react";
import "./alertaestoque.css";

const AlertaEstoque = ({ darkMode }) => {
    const [produtosBaixo, setProdutosBaixo] = useState([]);

    useEffect(() => {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        const filtrados = produtos.filter(prod => parseInt(prod.qtd, 10) <= 0);
        setProdutosBaixo(filtrados);
    }, []);

    return (
        <div className={`alertaEstoqueContainer ${darkMode ? "dark" : "light"}`}>
            <h2>Alerta de Estoque</h2>
            {produtosBaixo.length === 0 ? (
                <p>Todos os produtos estão com estoque suficiente.</p>
            ) : (
                <table className="alertaTable">
                    <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtosBaixo.map((prod, i) => (
                        <tr key={i}>
                            <td>{prod.nome}</td>
                            <td>{prod.qtd}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AlertaEstoque;
