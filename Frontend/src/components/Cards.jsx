import React from 'react';
import productoDestacado1 from "../assets/img/productoDestacado1.jpg"; // Asegúrate de que la ruta sea correcta
import productoDestacado2 from "../assets/img/productoDestacado2.jpg"; // Asegúrate de que la ruta sea correcta
import productoDestacado3 from "../assets/img/productoDestacado3.jpg"; // Asegúrate de que la ruta sea correcta

const Cards = () => {
    return (
        <section className="ContainerCards">
            <div className="headerCards">
                <h5 className="titularCards">¡Ofertas por tiempo limitado!</h5>
                <p className="titular-description">No esperes más y ahorra hoy mismo</p>
            </div>

            <div className="cardsContainer">

                <div className="ui card">
                    <div className="image">
                        <img src={productoDestacado1} alt="Xiaomi Redmi Note 11" />
                    </div>
                    <div className="content">
                        <a className="header">Xiaomi Redmi Note 11</a>
                        <div className="meta">
                            <span className="lastPrice">Antes $ 1'200.000</span>
                        </div>
                        <div className="description">$ 840.000 </div>
                    </div>
                    <div className="extra content">
                        <button className="btn-comprar">Comprar</button>
                    </div>
                </div>

                <div className="ui card">
                    <div className="image">
                        <img src={productoDestacado2} alt="Combo Gamer" />
                    </div>
                    <div className="content">
                        <a className="header">Combo Gamer</a>
                        <div className="meta">
                            <span className="lastPrice">Antes $ 3'500.000</span>
                        </div>
                        <div className="description">$ 2'450.000 </div>
                    </div>
                    <div className="extra content">
                        <button className="btn-comprar">Comprar</button>
                    </div>
                </div>

                <div className="ui card">
                    <div className="image">
                        <img src={productoDestacado3} alt="Pizza Congelada" />
                    </div>
                    <div className="content">
                        <a className="header">Pizza Congelada</a>
                        <div className="meta">
                            <span className="lastPrice">Antes $ 24.000</span>
                        </div>
                        <div className="description">$ 16.800 </div>
                    </div>
                    <div className="extra content">
                        <button className="btn-comprar">Comprar</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cards;
