import { getProducts, getProductsImage } from "./../../services/api";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import "./layout/index_prod.css";
import * as FaIcons from "react-icons/fa";
import {useSelector} from 'react-redux';
import { AuthContext } from "../../contexts/auth";



function Produto() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  console.log(busca);
  const { isAdm} = useContext(AuthContext);

  const filtroProd = products.filter((prod) => prod.description.toLowerCase().startsWith(busca.toLowerCase()));
  // const isAdm = useSelector(state => state.isAdm)

  useEffect(() => {
    (async () => {
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="titulo_prod">
      <h1>Produtos</h1>
      <div className="div_pesquisa">
      <FaIcons.FaSearch id="lupa"/>
      <input type="text"
        value={busca}
        onChange={(ev)=> setBusca(ev.target.value)}
      />
      { isAdm ? 
      <button className="bnt_add">
      <a href="/cadastroProd">
      <FaIcons.FaPlus id="add_prod"/>
      
       </a>
      </button>
      :null}
      </div>
      </div>
      <div className="produtos">
        {filtroProd.map((product) => (
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
              <FaIcons.FaCartPlus id="carrinho"/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Produto;
