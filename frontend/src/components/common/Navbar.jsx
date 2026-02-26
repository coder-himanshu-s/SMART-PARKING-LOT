import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Dashboard" },
    { path: "/slots", label: "All Slots" },
    { path: "/add-slot", label: "Add Slot" },
    { path: "/park", label: "Park Vehicle" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo">
            <span className="navbar__logo-icon">P</span>
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__title">SmartPark</span>
            <span className="navbar__subtitle">Lot Management</span>
          </div>
        </Link>

        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`navbar__link ${location.pathname === path ? "navbar__link--active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
