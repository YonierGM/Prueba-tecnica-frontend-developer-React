import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './header.css';
function Header() {
  return (
    <header className='header'>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/home">Inicio</Link>
          </li>
          <li>
            <Link to="/empleados">Listar empleados</Link>
          </li>
        </ul>
      </nav>
      </header>
  );
}
export default Header;