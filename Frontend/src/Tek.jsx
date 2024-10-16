import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import CardsProducts from './components/CardsProducts';
import './Index.css';

// Banner
import bannerTec from './assets/img/Tec/banner-Tec.webp';
const bannerView = [bannerTec];

// Imágenes
import product01 from './assets/img/Tec/tec01.webp';
import product02 from './assets/img/Tec/tec02.webp';
import product03 from './assets/img/Tec/tec03.webp';
import product04 from './assets/img/Tec/tec04.webp';
import product05 from './assets/img/Tec/tec05.jpg';
import product06 from './assets/img/Tec/tec06.webp';
import product07 from './assets/img/Tec/tec07.webp';
import product08 from './assets/img/Tec/tec08.webp';
import product09 from './assets/img/Tec/tec09.webp';
import product10 from './assets/img/Tec/tec10.webp';
import product11 from './assets/img/Tec/tec11.webp';
import product12 from './assets/img/Tec/tec12.webp';
import product13 from './assets/img/Tec/tec13.webp';
import product14 from './assets/img/Tec/tec14.webp';
import product15 from './assets/img/Tec/tec15.webp';
import product16 from './assets/img/Tec/tec16.webp';
import product17 from './assets/img/Tec/tec17.webp';
import product18 from './assets/img/Tec/tec18.webp';
import product19 from './assets/img/Tec/tec19.webp';
import product20 from './assets/img/Tec/tec20.webp';

// Titulares
const titularCard = [
  "Celulares",
  "Computadores",
  "Televisores",
  "Tablets",
  "Relojes Inteligentes"
];

// Headers
const headerCard = [
  "Celular iPhone 15 128GB ESIM - Azul",
  "Celular Samsung S24 Ultra 512GB Negro",
  "Celular Motorola Edge 40 Neo 256GB Azul",
  "Celular Vivo V25 Negro Diamante 128 GB",
  "Computador Portátil MacBook Pro 16 Pulgadas Gris Espacial 512GB",
  "Computador Portátil ASUS TUF Dash 15,6 Pulgadas FX517ZC 16GB Negro",
  "Portátil HP ZBook Firefly Intel Core I7-1165G7 16GB Ram 512GB SSD",
  "Portátil Lenovo ThinkPad 15 Pulgadas Inter Core I5-1135g7 256GB SSD",
  "Televisor Samsung 65 Pulgadas Oled UHD 4K",
  "Televisor Challenger 65 Pulgadas LED UHD Smart TV",
  "Televisor LG 86 Pulgadas Nano Cell LED UHD 4K Smart TV",
  "Televisor Hyundai 65 Pulgadas LED UHD Google TV",
  "iPad 10ª Generación 10.9 64GB- Plata",
  "Tablet Lenovo M11 8G 128G Wifi+Accesorios 11",
  "Tablet SAMSUNG 10.5 Pulgadas Tab A8 LTE Color Gris",
  "Tablet Xiaomi Redmi Pad 6 6GB - 128GB Gris",
  "Apple Watch Serie 8 45mm Medianoche",
  "Reloj Inteligente Citrea Smartwatch Color Negro",
  "Reloj Inteligente Xiaomi Smartwatch Amazfit GTS",
  "Reloj Inteligente Smartwatch Amazfit GTS"
];

// Precios
const descriptionCard = [
  "$ 5.739.900", "$ 6.379.900", "$ 1.299.900", "$ 2.599.900", "$ 6.599.542",
  "$ 6.699.542", "$ 7.499.900", "$ 6.839.880", "$ 10.469.700", "$ 2.199.900",
  "$ 9.799.900", "$ 2.505.700", "$ 2.730.000", "$ 1.299.000", "$ 1.399.700",
  "$ 2.015.900", "$ 2.299.700", "$ 350.000", "$ 607.497", "$ 1.129.025"
];

// Función para extraer los precios y convertirlos a número
const extractPrices = (description) => {
  return description.map(desc => {
    const cleaned = desc.replace(/[^\d,.]/g, '');
    const hasCommaAsDecimal = cleaned.includes(',') && cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.');
    let normalized = cleaned;
    if (hasCommaAsDecimal) {
      normalized = cleaned.replace(',', '.');
    } else {
      normalized = cleaned.replace(/,/g, '');
    }
    normalized = normalized.replace(/\.(?=\d{3})/g, '');
    return parseFloat(normalized);
  });
};

function Tek() {
  const productImages = [
    product01, product02, product03, product04, product05,
    product06, product07, product08, product09, product10,
    product11, product12, product13, product14, product15,
    product16, product17, product18, product19, product20
  ];

  const prices = extractPrices(descriptionCard);

  return (
    <>
      <NavBar />
      <Banner banner={bannerView} />
      <CardsProducts
        images={productImages}
        titular={titularCard}
        header={headerCard}
        prices={prices}
      />
      <Footer />
    </>
  );
}

export default Tek;
