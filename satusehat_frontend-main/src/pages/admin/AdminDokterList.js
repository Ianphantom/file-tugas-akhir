import styled from "styled-components";
import { Link } from "react-router-dom";

// import component
import DoctorListTable from "../../components/admin/DoctorListTable";

// import Icon
import plusIcon from "../../images/svg-icon/icon-plus.svg";
import { useEffect, useState } from "react";

const AdminDokterList = () => {
  let [messageState, setMessageState] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("messege");
    setMessageState(message);
  }, []);
  return (
    <DokterListContainer>
      <AdminPerizinanContainer className='card-design'>
        <div className='header-perizinan'>
          <div className='header-title'>Doctor List</div>
          <Link to={"/admin/add-doctor"} className='button-add'>
            <img src={plusIcon} alt='icon-plus' />
            <div>Add Doctor</div>
          </Link>
        </div>
      </AdminPerizinanContainer>
      {messageState && (
        <div
          className='alert alert-primary alert-dismissible fade show container mt-4 notificationContainer'
          role='alert'
        >
          <strong>Attention!</strong> {messageState}
          <button
            type='button'
            className='close'
            data-dismiss='alert'
            aria-label='Close'
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      )}
      <DoctorListTable />
    </DokterListContainer>
  );
};

const DokterListContainer = styled.div`
  margin-left: 20px;

  .notificationContainer {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const AdminPerizinanContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  &.card-design {
    border-radius: 8px;
    background: white;
    box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
    margin-bottom: 20px;
    padding: 16px 0px;
  }

  .header-perizinan {
    padding: 0px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 14px;
      color: #000000;
    }
    .button-add {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: #2d67f6;
      border-radius: 5px;
      font-weight: 700;
      font-size: 12px;
      line-height: 17px;
      color: #ffffff;

      img {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

export default AdminDokterList;
