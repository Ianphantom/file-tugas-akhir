import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";

import { ENDPOINT } from "../../utils/apiEndpoint";

const columns = [
  {
    name: "Nama Pasien",
    selector: (row) => row.pasien,
    cell: (row) => <div className='namaKlinik'>{row.nama_lengkap}</div>,
  },
  {
    name: "Nomor BPJS",
    sortable: true,
    selector: (row) => row.nomor_bpjs,
    cell: (row) => <div className='namaKlinik'>{row.nomor_bpjs}</div>,
  },
  {
    name: "Status",
    sortable: true,
    selector: (row) => row.status,
    cell: (row) => (
      <StatusContainer className={row.status}>{row.status}</StatusContainer>
    ),
  },
];

const AdminPerizinanTable = () => {
  const [dataPerizinan, setDataPerizinan] = useState([]);

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/perizinan/rs`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDataPerizinan(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <PerizinanContainer>
      <DataTable columns={columns} data={dataPerizinan} pagination />
    </PerizinanContainer>
  );
};

const PerizinanContainer = styled.div`
  padding: 25px 20px;
  margin-left: 20px;
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

const StatusContainer = styled.div`
  text-align: center;
  border-radius: 4px;
  padding: 4px 10px;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  &.Diberikan {
    color: #038c00;
    background: #e6ffe5;
  }

  &.Menunggu {
    color: #ff6b00;
    background: #fff7e7;
  }

  &.Ditolak {
    color: #ff0000;
    background: #ffecec;
  }
`;

export default AdminPerizinanTable;
