import React, { useState, useContext } from "react";
import "./layout/index.css";
import { createProduct } from "../../services/api";
import { AuthContext } from "../../contexts/auth";

const CadastroProd = () => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    register(description, price, image);
  };

  return (
    <div className="container">
      <div className="cadastro-form">
        <form onSubmit={handleSubmit}>
          <h1>CADASTRO DE PRODUTOS</h1>

          <div className="cadastro-label">
            <label>
              Nome do produto
              <div className="cadastro-input">
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {/* <span>{errors.description?.message}</span> */}
            </label>
          </div>
          <div className="cadastro-label">
            <label>
              Preço
              <div className="cadastro-input">
                <input
                  type="price"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              {/* <span>{errors.price?.message}</span> */}
            </label>
          </div>
          <div className="cadastro-label">
            <label>
              Imagem
              <div className="up-file">
                <input
                  type="file"
                  name="image"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="image"
                  // style={{ display: 'none' }}
                />
                <small id="helpId" > 
                {/* <FaIcons.FaUpload /> */}
                </small>
              </div>
              {/* {errors.image && (
            <span>
              *A senha precisa ter no mínimo 8 caracteres; <br /> *A senha
              precisa ter no mínimo uma letra maiúscula, <br />
              uma minúscula e um número
            </span>
          )} */}
            </label>
          </div>
          <div className="submit-button">
            <button type="submit">CRIAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroProd;
