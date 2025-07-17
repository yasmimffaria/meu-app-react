import React, { useEffect, useState } from "react";
import "./comissao.css";

const Comissao = ({ darkMode }) => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const lista = JSON.parse(localStorage.getItem("pedidosSimulados")) || [];
        setPedidos(lista);
    }, []);

    const calcularComissao = (preco, qtd, percentual) =>
        ((preco * qtd) * percentual) / 100;

    const pedidosComComissao = pedidos.filter(
        (p) => p.comissao && parseFloat(p.comissao) > 0
    );

    return (
        <div className={`comissaoContainer ${darkMode ? "dark" : "light"}`}>
            <h2 style={{ color: "#f57c00" }}>Comissão de Vendas</h2>

            {pedidosComComissao.length === 0 ? (
                <p>Nenhum pedido com comissão.</p>
            ) : (
                <table className="comissaoTable">
                    <thead style={{ backgroundColor: "#f57c00", color: "#fff" }}>
                    <tr>
                        <th>Produto</th>
                        <th>Qtd</th>
                        <th>Preço Unit.</th>
                        <th>Valor Total</th>
                        <th>Comissão (%)</th>
                        <th>Valor Comissão</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pedidosComComissao.map((pedido, i) => {
                        const produto = typeof pedido.produto === "string"
                            ? JSON.parse(pedido.produto)
                            : pedido.produto;

                        const qtd = parseInt(pedido.qtd) || 0;
                        const preco = parseFloat(produto?.preco) || 0;
                        const percentual = parseFloat(pedido.comissao) || 0;
                        const total = preco * qtd;
                        const valorComissao = calcularComissao(preco, qtd, percentual);

                        return (
                            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#ffe0b2" : "#fff" }}>
                                <td>{produto?.nome || "Produto desconhecido"}</td>
                                <td>{qtd}</td>
                                <td>R$ {preco.toFixed(2)}</td>
                                <td>R$ {total.toFixed(2)}</td>
                                <td>{percentual}%</td>
                                <td>R$ {valorComissao.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Comissao;
