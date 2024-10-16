import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import CardsProducts from './components/CardsProducts';
import './Index.css';

// Banner
import bannerPharmacy from './assets/img/drugs/bannerPharmacy.webp';
const bannerView = [bannerPharmacy];

// Imágenes
import product01 from './assets/img/drugs/drugs01.webp';
import product02 from './assets/img/drugs/drugs02.webp';
import product03 from './assets/img/drugs/drugs03.webp';
import product04 from './assets/img/drugs/drugs04.webp';
import product05 from './assets/img/drugs/drugs05.webp';
import product06 from './assets/img/drugs/drugs06.webp';
import product07 from './assets/img/drugs/drugs07.webp';
import product08 from './assets/img/drugs/drugs08.webp';
import product09 from './assets/img/drugs/drugs09.webp';
import product10 from './assets/img/drugs/drugs10.webp';
import product11 from './assets/img/drugs/drugs11.webp';
import product12 from './assets/img/drugs/drugs12.webp';
import product13 from './assets/img/drugs/drugs13.webp';
import product14 from './assets/img/drugs/drugs14.webp';
import product15 from './assets/img/drugs/drugs15.webp';
import product16 from './assets/img/drugs/drugs16.webp';
import product17 from './assets/img/drugs/drugs17.webp';
import product18 from './assets/img/drugs/drugs18.webp';
import product19 from './assets/img/drugs/drugs19.png';
import product20 from './assets/img/drugs/drugs20.webp';

// Titulares
const titularCard = [
  "Para tu cuidado personal",
  "Vitaminas y Suplementos",
  "Gripa y Tos",
  "Sistema Respiratorio",
  "Salud Sexual"
];
// Headers
const headerCard = [
  "Crema Hidratante Cetaphil Piel Sensible 453 G",
  "Protector Solar La Roche Posay Anthelios Gel-Crema",
  "Effaclar La Roche Posay Sérum Ultra Concentrado 30 Ml",
  "Condones Durex Máximo Placer X3 Unds",
  "Z Best Coboral Vainilla En Polvo 300 G",
  "Batidos Bénet Nutricionales Frutos Rojos 200 G",
  "Suplemento Dietario Farma D Mag X30 Tabletas",
  "L-Carnitina Healthy Sports 1000 Mg X60 Tabletas",
  "Noxpirin Plus Síntomas De Gripa X12 Cápsulas",
  "Vick Vaporub Ungüento 100 G",
  "Noraver Garganta Cereza X12 Tabletas",
  "Jarabe Abrilar Hereda Helix 200 ML",
  "Marimer Hipertónico Gilbert Baby Spray 100 ML",
  "Loratadina 10 Mg MK X10 Tabletas",
  "Benzirin Verde Tecnoquímicas Spray 120 ML",
  "Jarabe Clorfeniramina 2 Mg Ecar 120 ML",
  "Gel K-Y Lubricante Íntimo 50 G",
  "Condones Durex Extra Seguro X3 Unds",
  "Today Condoms Real Sensation X3 Unds",
  "Prueba De Embarazo Clearblue X1 Und"
];

// Descripciones y precios
const descriptionCard = [
  "$ 120.000", "$ 90.000", "$ 135.000", "$ 13.000", "$ 35.450",
  "$ 31.500", "$ 28.500", "$ 57.850", "$ 9.800", "$ 31.500",
  "$ 15.850", "$ 45.850", "$ 62.500", "$ 3.800", "$ 46.200",
  "$ 4.590", "$ 27.650", "$ 8.500", "$ 15.200", "$ 17.650"
];

// Función para extraer los precios y convertirlos a número
const extractPrices = (description) => {
  return description.map(desc => {
    // Eliminar cualquier símbolo que no sea dígito, punto o coma
    const cleaned = desc.replace(/[^\d,.]/g, '');

    // Detectar si el número usa coma como separador decimal
    const hasCommaAsDecimal = cleaned.includes(',') && cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.');

    // Si está usando coma como separador decimal, reemplazamos la coma por punto
    let normalized = cleaned;
    if (hasCommaAsDecimal) {
      // Reemplazamos la coma por punto para decimales
      normalized = cleaned.replace(',', '.');
    } else {
      // Eliminamos las comas si son separadores de miles
      normalized = cleaned.replace(/,/g, '');
    }

    // Eliminamos puntos que sean separadores de miles
    normalized = normalized.replace(/\.(?=\d{3})/g, '');

    // Convertir a número flotante
    const finalPrice = parseFloat(normalized);

    return finalPrice;
  });
};


function Pharmacy() {
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
        description={descriptionCard}
        prices={prices} // Pasar precios extraídos como prop
      />
      <Footer />
    </>
  );
}

export default Pharmacy;
