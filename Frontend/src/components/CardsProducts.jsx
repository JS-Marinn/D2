import React, { useContext } from 'react';
import { CartContext } from '../CartContext'; 


const CardsProducts = ({ images, titular, header, description }) => {
  const { addToCart } = useContext(CartContext); // Obtener addToCart desde el contexto

  const handleAddToCart = (index) => {
    // Crear el objeto del producto que se va a agregar al carrito
    const product = {
      id: index, // Asignar un identificador único para el producto
      name: header[index],
      description: description[index],
      image: images[index],
      price: Math.floor(Math.random() * 100) + 1, // Generar un precio aleatorio para el producto
    };

    addToCart(product); // Usar addToCart del contexto
  };

  return (
    <div>
      {/* Generar secciones dinámicamente según los títulos */}
      {titular.map((title, titularIndex) => (
        <div key={titularIndex}>
          <div className="headerCards">
            <h5 className="titularCards">{title}</h5>
          </div>

          <section className="ContainerCardsProducts">
            {/* Mostrar los productos correspondientes a cada título */}
            {header
              .slice(titularIndex * 4, titularIndex * 4 + 4) // Mostrar 4 productos por sección
              .map((item, index) => {
                const realIndex = titularIndex * 4 + index; // Índice real del producto
                return (
                  <div className="cardsContainerProducts" key={realIndex}>
                    <div className="ui card">
                      <div className="image">
                        <img
                          src={images[realIndex]}
                          loading="lazy"
                          alt={header[realIndex]}
                        />
                      </div>
                      <div className="content">
                        <a className="header">{header[realIndex]}</a>
                        <div className="description">
                          {description[realIndex]}
                        </div>
                      </div>
                      <div className="extra content">
                        <button
                          className="btn-comprar"
                          onClick={() => handleAddToCart(realIndex)}
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </section>
        </div>
      ))}
    </div>
  );
};

export default CardsProducts;
