import React from "react";
import styled from "styled-components";

import arrowRight from "../../images/svg-icon/icon-right.svg";

const ProfileSectionItem = ({ icon, title, desc }) => {
  return (
    <SectionContainer>
      <div className='left'>
        <div className='section-container'>
          <div className='icon-container'>
            <img src={icon} alt='Icon' />
          </div>
          <div className='information-container'>
            <div className='title'>{title}</div>
            <div className='desc'>{desc}</div>
          </div>
        </div>

        <div className='arrow-right'>
          <img src={arrowRight} alt='icon-arrow-right' />
        </div>
      </div>
      <div className='right'></div>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  padding: 16px 16px;
  display: flex;
  &:hover {
    cursor: pointer;
    background-color: #f8f9fa;
  }
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

export default ProfileSectionItem;
