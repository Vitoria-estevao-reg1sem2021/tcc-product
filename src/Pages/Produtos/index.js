import { getProducts, getProductsImage } from "./../../services/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./layout/index.css";


function Produto() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState([]);
  console.log(busca);

  // const filtroProd = product.filter((prod) => product.id.startsWith(busca));

  useEffect(() => {
    (async () => {
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="loading">Carregando dados</div>;
  }

  return (
    <>
      <div className="titulo_prod">
      <h1>Produtos</h1>
      <input type="text" 
        value={busca}
        onChange={(ev)=> setBusca(ev.target.value)}
      />
      </div>
      <div className="produtos">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img
              style={{ width: 150 }}
              className="card-img-top"
              src={
                "https://mais-arvores-api.herokuapp.com/products/download/" +
                product.image
              }
            />
            <div className="card-body">
              <br />
              <h4 className="card-title">{product.description}</h4>
              <p className="card-text">Preço: R$ {product.price}</p>
              <p className="card-text">
                Categoria: {product.category.description}
              </p>
              <button type="button" className="botao">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Produto;
