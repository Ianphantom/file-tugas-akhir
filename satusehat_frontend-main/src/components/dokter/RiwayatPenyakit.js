import { useState } from "react";
import styled from "styled-components";

import iconPlus from "../../images/svg-icon/icon-plus.svg";

const RiwayatPenyakit = () => {
  const [newDisease, setNewDisease] = useState(false);

  const addNewDisease = () => {
    setNewDisease(true);
  };
  return (
    <RiwayatPenyakitContainer>
      <div className='header'>
        <div className='title'>Disease History</div>
      </div>
      <div className='body-container'>
        <div className='item-history'>Insomnia</div>
        <div className='item-history'>Anemia</div>
        <div className='item-history'>Demam</div>
        <div className='item-history'>Flu</div>
        <div className='item-history'>Sinusitis</div>
        {newDisease && (
          <>
            <input type='text' placeholder='Add Disease' />
          </>
        )}
      </div>
      <div className='button-container'>
        <div className='buttonTambah' onClick={addNewDisease}>
          <img src={iconPlus} alt='icon-plus' />
          <div>Add Disease</div>
        </div>
      </div>
    </RiwayatPenyakitContainer>
  );
};

const RiwayatPenyakitContainer = styled.div`
  background: white;
  margin-top: 40px;
  margin-right: 20px;
  margin-bottom: 40px;
  /* border: 1px solid rgba(0, 0, 0, 0.08); */
  box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
  border-radius: 8px;
  .header {
    padding: 16px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: #001737;
    }
  }

  .body-container {
    padding: 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    .item-history {
      font-size: 14px;
      line-height: 20px;
      color: #8392a5;
    }
  }

  .button-container {
    padding: 16px 16px;

    .buttonTambah {
      padding: 12px 24px;
      background: #2d67f6;
      border-radius: 5px;
      color: white;
      text-align: center;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      justify-content: center;
    }
  }

  input {
    border: none;
    font-size: 14px;
    line-height: 20px;
    color: #8392a5;
    padding: 5px 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
`;

export default RiwayatPenyakit;
