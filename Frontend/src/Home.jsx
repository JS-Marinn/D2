import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import CardsProducts from './components/CardsProducts';

// Banner
import bannerHome from './assets/img/home/bannerHome.webp'

const bannerView = [bannerHome];

// Imágenes
import product01 from './assets/img/home/home01.webp';
import product02 from './assets/img/home/home02.webp';
import product03 from './assets/img/home/home03.webp';
import product04 from './assets/img/home/home04.webp';
import product05 from './assets/img/home/home05.jpg';
import product06 from './assets/img/home/home06.jpg';
import product07 from './assets/img/home/home07.webp';
import product08 from './assets/img/home/home08.webp';
import product09 from './assets/img/home/home09.webp';
import product10 from './assets/img/home/home10.webp';
import product11 from './assets/img/home/home11.webp';
import product12 from './assets/img/home/home12.webp';
import product13 from './assets/img/home/home13.webp';
import product14 from './assets/img/home/home14.webp';
import product15 from './assets/img/home/home15.jpg';
import product16 from './assets/img/home/home16.jpg';
import product17 from './assets/img/home/home17.webp';
import product18 from './assets/img/home/home18.webp';
import product19 from './assets/img/home/home19.webp';
import product20 from './assets/img/home/home20.png';

// Titulares
const titularCard = [
  "Zona De Descanso",
  "Almacenamiento",
  "Dale Estilo A Tu Hogar",
  "Zona De Comidas",
  "Utencilios Para Cocina"
];
// Headers
const headerCard = [
  "Combo Colchón Fantasía Galaxy 140x190",
  "Colchón Doble Con Base Cama 140x190x22cm",
  "Colchón Doble Easy Life Colchones Relax ",
  "Colchón Density 100X190 + Somier Tradición + Protector",
  "Closet Tera 180 X 80 X 48 RTA Ceniza Blanco",
  "Closet Ankora Basic 180 X 120 X 47 RTA Ceniza Blanco",
  "Closet Allegro 180 X 180 X 48 RTA Wengue",
  "Closet RTA Design 180,5X80X48,5 ",
  "Figura Mariposa H&H Dec 437-668707",
  "Figura Arbol Dec Concepts 437-498408 Plat",
  "Figura Jiraf Dec Concepts 437-498279 Dorado",
  "Figura Pajaro Dec Concepts 437-498277 Dorado",
  "Comedor Toledo 4 Puestos",
  "Comedor Ventura 4 Puestos",
  "Mesa Comedor Beijing ",
  "Mesa Comedor Torino ",
  "Sanduchera Altezza Asador Gris",
  "Hervidor De Agua Kalley",
  "Set Cuchillos Oster 14 Pz",
  "Horno De Microondas Oster "
];

// Descripciones
const descriptionCard = [
  "$ 975.000", "$ 970.900", "$ 575.900", "$ 750.000", "$ 489.900",
  "$ 815.900", "$ 950.000", "$ 445.800", "$ 49.800", "$ 51.500",
  "$ 68.900", "$ 85.850", "$ 885.000", "$ 742.500", "$ 350.000",
  "$ 399.999", "$ 48.900", "$  96.900", "$ 79.940", "$ 315.940"
];

function Home() {
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

export default Home;



