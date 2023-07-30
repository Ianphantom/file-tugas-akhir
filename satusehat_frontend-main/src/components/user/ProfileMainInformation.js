import React from "react";
import styled from "styled-components";

// import Verified Email
import thick from "../../images/svg-icon/icon-thick.svg";

const ProfileMainInformation = ({ icon, isVerified, text, result }) => {
  return (
    <MainInformationContainer>
      <div className='left'>
        <div className='icon-container'>
          <img src={icon} alt='icon-user' />
          {isVerified && (
            <img className='verified' src={thick} alt='verified' />
          )}
        </div>
      </div>
      <div className='right'>
        <div className='result'>{result}</div>
        <div className='text'>{text}</div>
      </div>
    </MainInformationContainer>
  );
};

const MainInformationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  .left {
    padding: 13px 13px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    .icon-container {
      position: relative;
      .verified {
        position: absolute;
        bottom: -10px;
        right: -15px;
      }
    }
  }

  .right {
    .text {
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #8392a5;
    }
    .result {
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      color: #001737;
    }
  }
`;

export default ProfileMainInformation;
