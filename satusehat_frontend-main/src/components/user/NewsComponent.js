import React from "react";
import styled from "styled-components";

const NewsComponent = ({ image, company, news, text, date }) => {
  return (
    <NewsContainer>
      <div className='header-container'>
        <div className='company-logo'>
          <img src={image} alt='img-company' />
        </div>
        <div className='header-information'>
          <div className='company'>{company}</div>
          <div className='news-title'>{news}</div>
        </div>
      </div>
      <div className='short-news'>{text}</div>
      <div className='published'>Published Date : {date}</div>
    </NewsContainer>
  );
};

const NewsContainer = styled.div`
  padding: 25px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-left: none;
  border-right: none;
  &:hover {
    cursor: pointer;
    background-color: #f8f9fa;
  }
  .header-container {
    display: flex;
    gap: 15px;
    align-items: center;
    .company-logo {
      width: 56px;
      height: 56px;
      background: rgba(26, 147, 111, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 50%;
        height: 50%;
      }
    }

    .header-information {
      .company {
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: rgba(55, 56, 87, 0.6);
        margin-bottom: 5px;
      }

      .news-title {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #06072d;
      }
    }
  }

  .short-news {
    margin-top: 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #575d78;
  }

  .published {
    width: fit-content;
    background: rgba(26, 147, 111, 0.1);
    margin-top: 15.5px;
    border-radius: 5px;
    padding: 5px 8px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    background: #e7efff;
    color: rgba(55, 56, 87, 0.6);
  }
`;

export default NewsComponent;
