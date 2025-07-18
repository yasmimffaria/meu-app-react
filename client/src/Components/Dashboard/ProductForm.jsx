import React, { useState, useEffect } from "react";
import "./cadastrarProduto.css";

const CadastrarProduto = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    qtd: "",
    descricao: "",
    imagemUrl: "", 
  });

  const [produtos, setProdutos] = useState([]);
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [editData, setEditData] = useState({ preco: "", qtd: "" });

  // Carrega produtos do localStorage ao iniciar
  useEffect(() => {
    const produtosSalvos = localStorage.getItem("produtos");
    if (produtosSalvos) {
      try {
        setProdutos(JSON.parse(produtosSalvos));
      } catch (e) {
        console.error("Erro ao ler produtos:", e);
        setProdutos([]);
      }
    }
  }, []);

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
    const novaLista = [...produtos, novoProduto];
    setProdutos(novaLista);
    localStorage.setItem("produtos", JSON.stringify(novaLista));
    alert("Produto cadastrado com sucesso!");
    setFormData({ nome: "", preco: "", qtd: "", descricao: "", imagemUrl: "" }); // Limpa campo novo
  };

  const handleEditClick = (index) => {
    setEditandoIndex(index);
    setEditData({
      preco: produtos[index].preco,
      qtd: produtos[index].qtd,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = (index) => {
    const atualizados = [...produtos];
    atualizados[index].preco = editData.preco;
    atualizados[index].qtd = editData.qtd;
    setProdutos(atualizados);
    localStorage.setItem("produtos", JSON.stringify(atualizados));
    setEditandoIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      const novaLista = produtos.filter((_, i) => i !== index);
      setProdutos(novaLista);
      localStorage.setItem("produtos", JSON.stringify(novaLista));
    }
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

            <div className="formGroup">
              <label>URL da Imagem</label>
              <input
                type="url"
                name="imagemUrl"
                value={formData.imagemUrl}
                onChange={handleInputChange}
                placeholder="https://exemplo.com/imagem.jpg"
                required
              />
            </div>

            <div className="formActions">
              <button type="submit" className="btnPrimary">Cadastrar</button>
              <button
                  type="button"
                  className="btnSecondary"
                  onClick={() =>
                      setFormData({ nome: "", preco: "", qtd: "", descricao: "" })
                  }
              >
                Limpar
              </button>
            </div>
          </form>
        </div>

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
                  <th>Imagem</th> {/* Nova coluna para imagem */}
                  <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {produtos.map((produto, index) => (
                    <tr key={index}>
                      <td>{produto.nome}</td>
                      <td>
                        {editandoIndex === index ? (
                            <input
                                type="number"
                                name="preco"
                                value={editData.preco}
                                onChange={handleEditChange}
                                style={{ width: "80px" }}
                            />
                        ) : (
                            parseFloat(produto.preco).toFixed(2)
                        )}
                      </td>
                      <td>
                        {editandoIndex === index ? (
                            <input
                                type="number"
                                name="qtd"
                                value={editData.qtd}
                                onChange={handleEditChange}
                                style={{ width: "60px" }}
                            />
                        ) : (
                            parseInt(produto.qtd)
                        )}
                      </td>
                      <td>{produto.descricao}</td>
                      <td>
                        <img
                          src={produto.imagemUrl}
                          alt={produto.nome}
                          style={{ width: "50px", height: "50px", borderRadius: "4px" }}
                        />
                      </td>
                      <td>
                        {editandoIndex === index ? (
                            <>
                              <button
                                  onClick={() => handleSaveEdit(index)}
                                  style={{
                                    backgroundColor: "#ff8c00",
                                    color: "#fff",
                                    marginRight: "5px",
                                    border: "none",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                  }}
                              >
                                Salvar
                              </button>
                              <button
                                  onClick={() => setEditandoIndex(null)}
                                  style={{
                                    backgroundColor: "#999",
                                    color: "#fff",
                                    border: "none",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                  }}
                              >
                                Cancelar
                              </button>
                            </>
                        ) : (
                            <>
                              <button
                                  onClick={() => handleEditClick(index)}
                                  style={{
                                    backgroundColor: "#ffa500",
                                    color: "#fff",
                                    marginRight: "5px",
                                    border: "none",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                  }}
                              >
                                Editar
                              </button>
                              <button
                                  onClick={() => handleDelete(index)}
                                  style={{
                                    backgroundColor: "#cc0000",
                                    color: "#fff",
                                    border: "none",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                  }}
                              >
                                Excluir
                              </button>
                            </>
                        )}
                      </td>
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
