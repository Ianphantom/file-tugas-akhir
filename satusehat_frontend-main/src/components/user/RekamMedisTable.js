import React, { useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { ENDPOINT } from "../../utils/apiEndpoint";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const columns = [
  {
    name: "Klinik",
    selector: (row) => row.klinik,
    sortable: true,
    cell: (row) => <div className='namaKlinik'>{row.nama_klinik}</div>,
  },
  {
    name: "Tanggal",
    selector: (row) => row.tanggal_pembuatan,
  },
  {
    name: "Dokter",
    selector: (row) => row.nama_lengkap,
  },
  {
    name: "Detail",
    button: true,
    selector: (row) => row.id,
    cell: (row) => {
      return (
        <Link to={`${row.nomor_pencatatan_blockchain}`}>
          <Button>View</Button>
        </Link>
      );
    },
  },
];

const RekamMedisTable = () => {
  const { currentUser } = useContext(AuthContext);
  const [dataRekamMedis, setDataRekamMedis] = useState([]);
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

    fetch(`${ENDPOINT}/rekammedis/list/${currentUser.uid}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDataRekamMedis(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, [currentUser.uid, setDataRekamMedis]);
  return (
    <TableContainer
      data-aos='fade-up'
      data-aos-duration='2000'
      data-aos-delay='500'
    >
      <div className='title'>Your Medical Record</div>
      <DataTable columns={columns} data={dataRekamMedis} pagination />
    </TableContainer>
  );
};

const TableContainer = styled.div`
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

export default RekamMedisTable;
