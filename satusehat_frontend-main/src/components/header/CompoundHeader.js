import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import brandImage from "../../images/brand-image.png";

// Import Components
import LeftNav from "./LeftNav";

const Header = () => {
  return (
    <HeaderContainer>
      <div className='container'>
        <nav className='navbar navbar-expand-lg'>
          <Link className='navbar-brand' to='/'>
            <img src={brandImage} alt='Brand Preview' />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav ml-auto'>
              <Link className='nav-item nav-link active' to='/'>
                Home
              </Link>
              <Link className='nav-item nav-link' to='/service'>
                Service
              </Link>
              <Link className='nav-item nav-link' to='/contact'>
                Contact
              </Link>
              <LeftNav />
            </div>
          </div>
        </nav>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  border-bottom: 1px solid #eceef3;
  .container {
    nav {
      padding: 20px 0px;
    }
    .navbar-nav {
      display: flex;
      gap: 30px;
      align-items: center;
      .nav-item {
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        color: #333333;
        transition: ease all 1s;
        &:hover {
          font-size: 18px;
        }
      }
    }
  }
`;

export default Header;
