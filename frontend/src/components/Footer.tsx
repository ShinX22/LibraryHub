import React from "react";

const Footer = () => {
  return (
    <footer style={{
      textAlign: "center",
      padding: "2.5rem 1.5rem",
      fontSize: "0.85rem",
      color: "var(--stone-dark, #8a7a62)",
      borderTop: "1px solid var(--sand-3, #e8e0d2)",
      marginTop: "auto",
      width: "100%",
      position: "relative",
      zIndex: 100,
    }}>
      <a href="https://kcet.ac.in" target="__blank" style={{ color: "inherit", textDecoration: "none" }}>© KCET Digital Library</a> | <a href="https://campusvault.xyz" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>campusvault.xyz</a>
    </footer>
  );
};

export default Footer;
