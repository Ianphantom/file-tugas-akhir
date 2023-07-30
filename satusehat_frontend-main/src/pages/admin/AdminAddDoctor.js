import React from "react";
import styled from "styled-components";
import AllDoctorTable from "../../components/admin/AllDoctorTable";
// import FormComponent from "../../components/dokter/formComponent";

const AdminAddDoctor = () => {
  return (
    <AddDoctorContainer>
      <div className='card-design'>
        <div className='title'>Add New Doctor to Hospital</div>
        <div className='form-container'>
          <AllDoctorTable />
        </div>
        {/* <div className='submit-container'>
          <div className='cancel'>Cancel</div>
          <div className='submit'>Submit</div>
        </div> */}
      </div>
    </AddDoctorContainer>
  );
};

const AddDoctorContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  margin-bottom: 40px;
  .card-design {
    border-radius: 8px;
    background: white;
    box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
    margin-bottom: 20px;
    padding-bottom: 16px;
  }

  .title {
    padding: 16px 16px;
    font-weight: 600;
    font-size: 16px;
    line-height: 14px;
    color: #000000;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    margin-bottom: 22px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 22px;
    margin-bottom: 22px;
    padding: 0px 16px;
  }

  .submit-container {
    padding: 0px 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    .cancel {
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #999999;
      cursor: pointer;
    }

    .submit {
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
      padding: 12px 24px;
      background: #2d67f6;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

export default AdminAddDoctor;
