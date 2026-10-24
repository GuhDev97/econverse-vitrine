import './App.scss';

import { useEffect, useState } from "react";
import type { Produto } from "./types/Produto";

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const resposta = await fetch("/api-econverse/teste-front-end/junior/tecnologia/lista-produtos/produtos.json");

        if (!resposta.ok) {
          throw new Error("Não foi possível buscar os produtos.");
        }

        const dados = await resposta.json();
        const listaProdutos = dados.products || dados.results || dados;

        if (Array.isArray(listaProdutos)) {
          setProdutos(listaProdutos);
        } else {
          setProdutos([]);
        }
      } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
      }
    }

    buscarProdutos();
  }, []);

  return (
    <>
      {/* CABEÇALHO */}
      <header className="header">
        <div className="header__top-bar">
          <div className="header__top-bar__container">
            <div className="header__top-bar__verificado">
              <img src="/verificado-2.png" alt="Verificado" />
              <p>Compra <strong>100% segura</strong></p>
            </div>
            <div className="header__top-bar__frete">
              <img src="/frete.png" alt="Frete grátis" />
              <p><strong>Frete grátis</strong> acima de R$ 200</p>
            </div>
            <div className="header__top-bar__parcelas">
              <img src="/CreditCard.png" alt="Parcelamento" />
              <p><strong>Parcele</strong> suas compras</p>
            </div>
          </div>
        </div>

        <div className="header__container">
          <div className="header__logo">
            <img src="/Logo.png" alt="Logo Econverse" />
          </div>

          <div className="header__search">
            <input type="text" placeholder="O que você está buscando?" />
            <button type="button" className="search-button" aria-label="Pesquisar">
              <img src="/MagnifyingGlass.png" alt="Lupa" />
            </button>
          </div>

          <div className="header__cart">
            <button type="button" className="cart-button" aria-label="Carrinho de compras">
              <img src="/carrinho.png" alt="Carrinho de compras" />
            </button>
          </div>
        </div>

        {/* MENU DE CATEGORIAS DO TOPO */}
        <nav className="header-menu">
          <ul className="header-menu__container">
            <li>SUPERMERCADO</li>
            <li>LIVROS</li>
            <li>MODA</li>
            <li>LANÇAMENTOS</li>
            <li className="active">OFERTAS DO DIA</li>
            <li>ASSINATURA</li>
          </ul>
        </nav>
      </header>

      {/* BANNER PRINCIPAL */}
      <section className="hero-banner">
        <div className="hero-banner__container">
          <div className="hero-banner__content">
            <h1>Venha conhecer nossas promoções</h1>
            <p><strong className="hero-banner__strong">50% Off</strong> nos produtos</p>
            <button type="button" className="hero-banner__button">Ver produto</button>
          </div>
        </div>
      </section>

      {/* ÍCONES DE CATEGORIAS */}
      <section className="category-icons-grid">
        <div className="category-icons-grid__container">
          <div className="category-icons-grid__item active">
            <div className="category-icons-grid__card">
              <img src="/tecnologia.png" alt="Tecnologia" />
            </div>
            <span>Tecnologia</span>
          </div>

          <div className="category-icons-grid__item">
            <div className="category-icons-grid__card">
              <img src="/supermercado.png" alt="Supermercado" />
            </div>
            <span>Supermercado</span>
          </div>

          <div className="category-icons-grid__item">
            <div className="category-icons-grid__card">
              <img src="/bebidas.png" alt="Bebidas" />
            </div>
            <span>Bebidas</span>
          </div>

          <div className="category-icons-grid__item">
            <div className="category-icons-grid__card">
              <img src="/ferramentas.png" alt="Ferramentas" />
            </div>
            <span>Ferramentas</span>
          </div>

          <div className="category-icons-grid__item">
            <div className="category-icons-grid__card">
              <img src="/saude.png" alt="Saúde" />
            </div>
            <span>Saúde</span>
          </div>

          <div className="category-icons-grid__item">
            <div className="category-icons-grid__card">
              <img src="/esportes.png" alt="Esportes e Fitness" />
            </div>
            <span>Esportes e Fitness</span>
          </div>

          <div className="category-icons-grid__item">
            <div className="category-icons-grid__card">
              <img src="/icon-moda.svg" alt="Moda" />
            </div>
            <span>Moda</span>
          </div>
        </div>
      </section>

      {/* CORPO */}
      <main>
        {/* BARRA DE CATEGORIAS */}
        <section className="categories-bar">
          <div className="categories-bar__container">
            <button className="categories-bar__item active">CELULAR</button>
            <button className="categories-bar__item">ACESSÓRIOS</button>
            <button className="categories-bar__item">TABLETS</button>
            <button className="categories-bar__item">NOTEBOOKS</button>
            <button className="categories-bar__item">TVS</button>
            <button className="categories-bar__item">VER TODOS</button>
          </div>
        </section>

        <h1>Produtos relacionados</h1>

        <div className="produtos-grid">
          {produtos.map((produto, indice) => (
            <article key={`${produto.productName}-${indice}`} className="produto-card">
              <img src={produto.photo} alt={produto.productName} width="180" />
              <h2>{produto.productName}</h2>
              <p>{produto.descriptionShort}</p>
              <p className="preco">
                {produto.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              <button onClick={() => setProdutoSelecionado(produto)}>
                Ver detalhes
              </button>
            </article>
          ))}
        </div>

        {/* MODAL DE DETALHES */}
        {produtoSelecionado && (
          <div className="modal-overlay">
            <div className="modal-content">
              <img src={produtoSelecionado.photo} alt={produtoSelecionado.productName} width="150" />
              <h3>{produtoSelecionado.productName}</h3>
              <p>{produtoSelecionado.descriptionShort}</p>
              <p className="preco">
                {produtoSelecionado.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              <button className="modal-close" onClick={() => setProdutoSelecionado(null)}>
                X Fechar
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;