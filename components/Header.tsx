"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./Header.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [load, isloaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);




  // Close mobile menu on outside click
  useEffect(() => {
    isloaded(true);
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
        setDropdownOpen(false);
      }
    }
      // header scrolled

      const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener('scroll', handleScroll);}
  
  }, []);

  if (!load) return null;
  return (
    <header className={scrolled? "navbar scrolled": "navbar"}>
      <div className="navbar-container" ref={menuRef}>
        <Link href="/" className="logo">SmartGen</Link>

        <nav className={`nav-links ${mobileOpen ? "open" : ""}`}>
          <Link href="/products">All Products</Link>

          <div className="dropdown">
            <div className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <a href="/#categories">Categories ▾</a>
              <div className="dropdown-menu">
                <Link href="/products?category=apparel">Apparel</Link>
                <Link href="/products?category=tech">Tech</Link>
                <Link href="/products?category=accessories">Accessories</Link>
              </div>
            </div>
          </div>

          <Link href="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
        </nav>

        <div
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={ `bar ${mobileOpen? "rotate": ""}`} />
          <span className={ `bar mid ${mobileOpen? "rotate": ""}`} />
          <span className={ `bar ${mobileOpen? "rotate": ""}`} />
        </div>
      </div>
    </header>
  );
}