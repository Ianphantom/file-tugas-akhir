import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { Link } from "react-router-dom";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

// import
import { ENDPOINT } from "../../utils/apiEndpoint";

const columns = [
  {
    name: "Nama Dokter",
    selector: (row) => row.dokter,
    cell: (row) => <div className='namaKlinik'>{row.nama_lengkap}</div>,
  },
  {
    name: "Keterangan ",
    selector: (row) => row.keterangan,
  },
  {
    name: "Status",
    sortable: true,
    selector: (row) => row.status,
    cell: (row) => (
      <StatusContainer className={row.status}>{row.status}</StatusContainer>
    ),
  },
  {
    name: "Detail",
    button: true,
    cell: (row) => (
      <Link to={row.id_perizinan}>
        <Button>View</Button>
      </Link>
    ),
  },
];

const PerizinanTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    AOS.init();
  }, []);

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

    fetch(`${ENDPOINT}/perizinan`, requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <PerizinanContainer
      data-aos='fade-up'
      data-aos-duration='2000'
      data-aos-delay='500'
    >
      <div className='title'>Permission List</div>
      <DataTable columns={columns} data={data} pagination />
    </PerizinanContainer>
  );
};

const PerizinanContainer = styled.div`
  padding: 25px 20px;

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

export default PerizinanTable;
