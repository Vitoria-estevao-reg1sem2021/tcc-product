import React, { useState, useContext } from "react";
import "./layout/cadas_prod.css";
import { createProduct } from "../../services/api";
import { AuthContext } from "../../contexts/auth";
import * as FaIcons from "react-icons/fa";
// import {useSelector } from 'react-redux';


const CadastroProd = () => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const imgFunction = (event) => {
    setImage(event.target.value)
      const reader = new FileReader();
      reader.onload = function(){
        const output = document.getElementById('output');
        output.src = reader.result;
        
      };
      reader.readAsDataURL(event.target.files[0]);
  }

  const { register} = useContext(AuthContext);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    register(description, price, image);
  };

  // const loggedInAdm = useSelector(state => state.loggedInAdm)


  return (
    <div className="container">
      <div className="cadastro-form">
        <form onSubmit={handleSubmit}>
          <h1>CADASTRO DE PRODUTOS</h1>
          <div className="cadastro-labelp">
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
            </label>
          </div>
          <div className="cadastro-labelp">
            <label>
              Preço
              <div className="cadastro-input">
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </label>
          </div>
          {image != null && image != "" ?  
          <div className="id_img">
                <img id="output" style={{
                  minHeight: "200px",
                  minWidth:"200px", 
                  maxHeight: "200px",
                  maxWidth: "200px",
                  border: "0px"} }/>
              </div>
            :null}
          <div className="cadastro-labelp">
            <label>
              <div >
                <input
                  type="file"
                  name="image"
                  id="image"
                  value={image}
                  onChange={(e) => imgFunction(e)}
                  placeholder="image"
                  hidden
                />
                <label for="image" id="Up_img_label">
                  <center>
                  <FaIcons.FaUpload id="icon_upload"/>
                  </center>
                </label>
              </div>
            </label>
          </div>
          <div className="button-criar">
            <button type="submit">CRIAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default CadastroProd;
