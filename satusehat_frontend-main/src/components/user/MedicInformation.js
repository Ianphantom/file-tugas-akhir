import React from "react";
import styled from "styled-components";

const ArrayDesc = ({ text }) => {
  return (
    <div className='desc'>
      <li>{text}</li>
    </div>
  );
};

const MedicInformation = ({ icon, title, desc }) => {
  // console.log(typeof desc);
  return (
    <SectionContainer>
      <div className='left'>
        <div className='section-container'>
          <div className='icon-container'>
            <img src={icon} alt='Icon' />
          </div>
          <div className='information-container'>
            <div className='title'>{title}</div>
            {typeof desc === typeof "string" ? (
              <div className='desc'>{desc}</div>
            ) : (
              desc.map((element) => <ArrayDesc text={element} key={element} />)
            )}
          </div>
        </div>
      </div>
      <div className='right'></div>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  padding: 16px 16px;
  display: flex;
  .left {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .section-container {
      display: flex;
      align-items: center;
      gap: 22px;
    }
    .information-container {
      .title {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #001737;
        margin-bottom: 3px;
      }
      .desc {
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: #8392a5;
      }
    }
  }
`;

export default MedicInformation;
