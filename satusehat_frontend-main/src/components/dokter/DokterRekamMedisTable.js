import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { ENDPOINT } from "../../utils/apiEndpoint";

import { Link } from "react-router-dom";

// import csv
import iconSearch from "../../images/svg-icon/icon-search.svg";

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    cell: (row) => <div className='namaKlinik'>{row.nama_lengkap}</div>,
  },
  {
    name: "BPJS Number",
    selector: (row) => row.nomor_bpjs,
  },
  {
    name: "Detail",
    button: true,
    selector: (row) => row.id,
    cell: (row) => {
      return (
        <Link to={`${row.uuid}`}>
          <Button>View</Button>
        </Link>
      );
    },
  },
];

const DokterRekamMedisTable = () => {
  const [dataPasien, setDataPasien] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  const inputHandler = (event) => {
    setSearchFilter(event.target.value);
  };

  useEffect(() => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/pasien`, requestOptions)
      .then((response) => response.json())
      .then((result) => setDataPasien(result))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    const dataFilter = dataPasien.filter((item) =>
      item.nama_lengkap.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setDataToShow(dataFilter);
  }, [searchFilter, dataPasien]);
  return (
    <TableContainer>
      <div className='search-bar'>
        <div className='icon-search'>
          <img src={iconSearch} alt='icon-search' />
        </div>
        <input
          type='search'
          name=''
          id=''
          placeholder='Search your patient name'
          onChange={inputHandler}
        />
      </div>
      <div className='title'>Your Patient's Medical Record</div>
      <DataTable columns={columns} data={dataToShow} pagination />
    </TableContainer>
  );
};

const TableContainer = styled.div`
  padding: 25px 20px;

  background: white;
  border-radius: 8px;
  box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
  .search-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #ffffff;
    border: 1px solid #eff2f7;
    border-radius: 8px;
    padding: 11px 16px;
    margin-bottom: 20px;
    input {
      border: none;
      width: 100%;
      font-size: 14px;
      line-height: 19px;
      padding: 0px 5px;
      color: #9a9a9a;
      &:focus {
        outline-color: white;
      }
    }
  }
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

export default DokterRekamMedisTable;
