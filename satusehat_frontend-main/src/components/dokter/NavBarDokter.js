import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const NavBarDokter = () => {
  const url = useLocation().pathname.split("/");
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <NavBarContainer data-aos='fade-up' data-aos-duration='2000'>
      <div className='divider'>
        <Link to='dashboard'>
          <div
            className={`navigation-container ${
              url[2] === "dashboard" ? "active" : ""
            }`}
          >
            Dashboard
          </div>
        </Link>
        <hr />
        <Link to='rekam-medis'>
          <div
            className={`navigation-container ${
              url[2] === "rekam-medis" ? "active" : ""
            }`}
          >
            Medical Records
          </div>
        </Link>
        <hr />
        <Link to='permission'>
          <div
            className={`navigation-container ${
              url[2] === "permission" ? "active" : ""
            }`}
          >
            Permission
          </div>
        </Link>
      </div>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.div`
  width: 100%;
  .divider {
    background: white;
    margin-top: 40px;
    margin-right: 20px;
    margin-bottom: 40px;
    padding: 16px 16px;
    /* border: 1px solid rgba(0, 0, 0, 0.08); */
    box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
    border-radius: 8px;
    font-size: 14px;
    .active {
      font-size: 16px;
      color: #2d67f6 !important;
    }
    .navigation-container {
      cursor: pointer;
      color: black;
      transition: 1s ease all;
      &:hover {
        font-size: 16px;
        color: #2d67f6;
      }
    }
  }

  @media (max-width: 1000px) {
    .divider {
      margin-right: 0px;
    }
  }
`;

export default NavBarDokter;
