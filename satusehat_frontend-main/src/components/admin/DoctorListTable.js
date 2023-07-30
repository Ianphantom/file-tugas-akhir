import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ENDPOINT } from "../../utils/apiEndpoint";
import { AuthContext } from "../../context/AuthContext";

const columns = [
  {
    name: "Doctor Name",
    selector: (row) => row.pasien,
    cell: (row) => <div className='namaKlinik'>{row.nama_lengkap}</div>,
  },
  {
    name: "roles",
    sortable: true,
    selector: (row) => row.status,
    cell: (row) => <div className={row.status}>{row.id_roles}</div>,
  },
  {
    name: "Detail",
    button: true,
    cell: () => (
      <Link to='#'>
        <Button>View</Button>
      </Link>
    ),
  },
];

const DoctorListTable = () => {
  const { currentUser } = useContext(AuthContext);
  const [dataDoctor, setDataDoctor] = useState([]);
  useEffect(() => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/petugasrs/klinik/${currentUser.klinik}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setDataDoctor(result))
      .catch((error) => console.log("error", error));
  }, [currentUser.klinik]);
  return (
    <PerizinanContainer>
      <DataTable columns={columns} data={dataDoctor} pagination />
    </PerizinanContainer>
  );
};

const PerizinanContainer = styled.div`
  padding: 25px 20px;
  margin-bottom: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
  .title {
    font-weight: 600;
    font-size: 16px;
    line-height: 14px;
    color: #000000;
    margin-bottom: 24px;
  }

  .rdt_TableCol {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: rgb(33, 37, 41);
  }

  .rdt_TableHeadRow {
    background: #f8f8fa;
    border-bottom: 1px solid #eff2f7;
    border-radius: 0px !important;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
  }

  .rdt_TableRow {
    padding: 16px 0px;
    &:not(:last-of-type) {
      border-bottom: 1px solid #eff2f7;
    }
  }

  .rdt_Pagination {
    border-top: 1px solid #eff2f7;
  }
`;

const Button = styled.button`
  background-color: #2d67f6;
  border: 1px solid #556ee6;
  border-radius: 3.2px;
  padding: 4px 26px;
  font-weight: 400;
  font-size: 11.375px;
  line-height: 17px;
  cursor: pointer;
  color: #ffffff;
`;

export default DoctorListTable;
