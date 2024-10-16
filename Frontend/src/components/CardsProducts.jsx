import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

const CardsProducts = ({ images, titular, header, prices }) => { // Eliminar 'description' del destructuring
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (index) => {
    const product = {
      id: index,
      name: header[index],       // Nombre del producto
      image: images[index],      // Imagen del producto
      price: prices[index]       // Asegurarse de pasar el precio NUMÉRICO correcto aquí
    };

    addToCart(product);
  };

  return (
    <div>
      {titular.map((title, titularIndex) => (
        <div key={titularIndex}>
          <div className="headerCards">
            <h5 className="titularCards">{title}</h5>
          </div>

          <section className="ContainerCardsProducts">
            {header
              .slice(titularIndex * 4, titularIndex * 4 + 4)
              .map((item, index) => {
                const realIndex = titularIndex * 4 + index;
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
                        <a className="header" title={header[realIndex]}>
                          {header[realIndex]}
                        </a>
                      </div>

                      <div className="extra content">
                        {/* Mostrar el precio correcto usando el array 'prices' */}
                        <p className="item-price">
                          Precio: ${prices[realIndex].toLocaleString()}
                        </p>
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
