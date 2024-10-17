import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { AuthContext } from '../context/AuthContext'; // Importa el AuthContext
import { useNavigate } from 'react-router-dom';

const CardsProducts = ({ images, titular, header, prices }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Accede al estado del usuario
  const navigate = useNavigate();

  const handleAddToCart = (index) => {
    if (!user) {
      navigate('/login'); // Redirige al login si no hay usuario
    } else {
      const product = {
        id: index,
        name: header[index],
        image: images[index],
        price: prices[index]
      };
      addToCart(product);
    }
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
