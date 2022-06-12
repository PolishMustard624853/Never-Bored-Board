import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h3 style={{textAlign: "center", backgroundColor: "pink", borderRadius: "10px" }}>
        © Copyright Protected
        </h3>
        <h4 style={{textAlign: "center", backgroundColor: "pink", borderRadius: "10px" }}>
          by the Never Bored Board Board of Directors.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
