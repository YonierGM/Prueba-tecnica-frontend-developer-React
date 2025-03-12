import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  const [menu, setMenu] = useState(false);
  const toggle = () => setMenu(!menu);

  return (
    <section className="content-menu">
      <nav className="navbar">
        <div className="content-navbar">
          <div className="imagen-logo">
            <h1>Gestión Empleados</h1>
          </div>
          <i className="fa-solid fa-bars-staggered" onClick={toggle}></i>
        </div>
        
        <ul className={`opciones ${menu ? "mostrar" : ""}`}>
          <div className="header-menu">
            <div className="content-header">
              <h4>Gestión empleados</h4>
              <i className="fa-solid fa-xmark" onClick={toggle}></i>
            </div>
            <div className="hr">
              <hr />
            </div>
          </div>
          
          <div className="content-opciones">
            <li>
              <Link to="/Home" className="menu-link" onClick={toggle}>Inicio</Link>
            </li>
            <li>
              <Link to="/empleados" className="menu-link" onClick={toggle}>Empleados</Link>
            </li>
          </div>
          
          <div className="footer-menu">
            <div className="redes">
              <p>Prueba técnica by</p>
              <div className="icons">
                <a href="https://www.instagram.com/jhonnier.gm/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-square-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/in/yonier-garcia-mosquera-85a0b72a9/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="https://github.com/YonierGM" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-square-github"></i>
                </a>
              </div>
            </div>
          </div>
        </ul>
      </nav>
      <hr />
    </section>
  );
}

export default Header;
