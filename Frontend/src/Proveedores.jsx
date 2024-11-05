import NavBar from './components/NavBar';
import ProveedoresCrud from './components/ProveedoresCrud';
import Footer from './components/Footer';
import './Index.css';

function Proveedores() {

    return (
      <>
        <div>
        <NavBar />
        <ProveedoresCrud/>
        <Footer/>
      </div>
      </>
    )
  }
  
  export default Proveedores