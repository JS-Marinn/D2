import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import CardsProducts from './components/CardsProducts';
import './Index.css';

// Banner
import bannerMarket from './assets/img/market/bannerMarket.webp'

const bannerView = [bannerMarket];

// Imágenes
import product01 from './assets/img/market/market01.webp'
import product02 from './assets/img/market/market02.png'
import product03 from './assets/img/market/market03.webp'
import product04 from './assets/img/market/market04.webp'
import product05 from './assets/img/market/market05.webp'
import product06 from './assets/img/market/market06.webp'
import product07 from './assets/img/market/marketo7.webp'
import product08 from './assets/img/market/market08.webp'
import product09 from './assets/img/market/market09.webp'
import product10 from './assets/img/market/market10.webp'
import product11 from './assets/img/market/market11.webp'
import product12 from './assets/img/market/market12.webp'
import product13 from './assets/img/market/market13.webp'
import product14 from './assets/img/market/market14.webp'
import product15 from './assets/img/market/market15.webp'
import product16 from './assets/img/market/market16.webp'
import product17 from './assets/img/market/market17.png'
import product18 from './assets/img/market/market18.png'
import product19 from './assets/img/market/market19.webp'
import product20 from './assets/img/market/market20.png'

// Titulares
const titularCard = [
  "Productos Lacteos",
  "Carnes Frias",
  "Productos Grano",
  "Frutas Y Verduras",
  "Licores"
];
// Headers
const headerCard = [
  "Leche Uht Alquería Deslactosada 1,1 Lt X6 Unds",
  "Queso Finesse Mozarella 450 G X30 Tajadas",
  "Leche Uht Colanta Entera 1,1 Lt X6 Unds",
  "Avena Alpina Original 250 G X4 Unds",
  "Cerdo Lomo Importado",
  "Pez Mojarra Roja X Kg",
  "Pollo Pechuga Congelada kg",
  "Tocineta De Cerdo kg",
  "Arroz Diana 3 Kg",
  "Frijoles Zenú Antioqueño",
  "Garbanzos La Coruña ",
  "Arvejas Con Zanahoria 300G",
  "Manzana Roja Chilena A Granel",
  "Tomate Río Grande/Ciruelo",
  "Mango Tommy",
  "Cebolla Cabezona Roja",
  "Whisky Old Parr 12 Años 750 Ml",
  "Whisky Buchanan's Deluxe 12 Años 750 Ml ",
  "Whisky Scottish Fox Blended 700 Ml",
  "Cerveza Club Colombia Dorada  330 ML "
];

// Descripciones
const descriptionCard = [
  "$ 32.500", "$ 23.890", "$ 30.200", "$  9.640", "$ 20.380",
  "$  16.500", "$ 11.500", "$ 20.280", "$ 12.350", "$ 6.500",
  "$ 7.600", "$  8.550", "$ 8.550", "$  3.990", "$ 4.750",
  "$  3.890", "$ 142.000 ", "$164.000 ", "$ 37.550 ", "$ 18.900"
];

function Market() {
  const productImages = [
    product01, product02, product03, product04, product05,
    product06, product07, product08, product09, product10,
    product11, product12, product13, product14, product15,
    product16, product17, product18, product19, product20
  ];

  return (
    <>
      <NavBar />
      <Banner banner={bannerView} />
      <CardsProducts images={productImages} titular={titularCard} header={headerCard} description={descriptionCard} />
      <Footer />
    </>
  );
}

export default Market;



