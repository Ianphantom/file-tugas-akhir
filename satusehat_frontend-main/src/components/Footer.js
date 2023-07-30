import React from "react";

import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <div className='container'>
        <div className='left'>
          &#169; Copyright &#169; IanFelixJS. All Rights Reserved Copyright
        </div>
        <div className='right'>
          <div className='item'>Terms and Conditions</div>
          <div className='item'>Privacy Policy</div>
          <div className='item'>Pricing</div>
        </div>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  padding: 30px 0px;
  border-top: 1px solid #eceef3;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #838489;
  .container {
    display: flex;
    justify-content: space-between;

    .right {
      display: flex;
      gap: 20px;
    }
  }

  @media (max-width: 1000px) {
    .container {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }
`;

export default Footer;
