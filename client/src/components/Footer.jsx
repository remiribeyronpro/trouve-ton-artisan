import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img src={logo} alt="" className="footer-logo" />
          <p>Conseil régional Auvergne-Rhône-Alpes<br/>101 cours Charlemagne<br/>CS 20033<br/>69269 LYON CEDEX 02<br/>France</p>
          <p>Tél. +33 (0)4 26 73 40 00</p>
        </div>
        <nav aria-label="Liens légaux">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/donnees-personnelles">Données personnelles</Link>
          <Link to="/accessibilite">Accessibilité</Link>
          <Link to="/cookies">Cookies</Link>
        </nav>
      </div>
    </footer>
  );
}
