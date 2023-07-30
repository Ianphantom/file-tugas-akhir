import styled from "styled-components";
import { Link } from "react-router-dom";

// import component
import AdminPerizinanTable from "../../components/admin/AdminPerizinanTable";

// import Icon
import plusIcon from "../../images/svg-icon/icon-plus.svg";

const AdminPerizinan = () => {
  return (
    <>
      <AdminPerizinanContainer className='card-design'>
        <div className='header-perizinan'>
          <div className='header-title'>Permission List</div>
          <Link to='/admin/add-permission' className='button-add'>
            <img src={plusIcon} alt='icon-plus' />
            <div>Add Request</div>
          </Link>
        </div>
      </AdminPerizinanContainer>
      <AdminPerizinanTable />
    </>
  );
};

const AdminPerizinanContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
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
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: #2d67f6;
      border-radius: 5px;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      color: #ffffff;
    }
  }
`;

export default AdminPerizinan;
