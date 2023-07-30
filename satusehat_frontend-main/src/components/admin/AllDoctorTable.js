import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";

import InputComponent from "../input/input.component";
import FormComponent from "../dokter/formComponent";
import { AuthContext } from "../../context/AuthContext";

// toast component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ENDPOINT } from "../../utils/apiEndpoint";
import { useNavigate } from "react-router-dom";

let defaultFormFields = {
  uuid: null,
  id_klinik: null,
  id_roles: "dokter",
  username: null,
  password: null,
};

const AllDoctorTable = () => {
  const [dataDoctor, setDataDoctor] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dataToShow, setDataToShow] = useState(dataDoctor);
  const [searchFilter, setSearchFilter] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const navigate = useNavigate();

  const columns = [
    {
      name: "Doctor Name",
      selector: (row) => row.pasien,
      cell: (row) => <div className='namaKlinik'>{row.nama_lengkap}</div>,
    },
    {
      name: "NPA Number",
      sortable: true,
      selector: (row) => row.status,
      cell: (row) => <div className={row.status}>{row.nomor_npa}</div>,
    },
    {
      name: "Detail",
      button: true,
      cell: (row) => (
        <Button onClick={() => chooseDoctor(row.uuid)}>Add</Button>
      ),
    },
  ];

  const chooseDoctor = (uuid) => {
    setFormFields({
      ...formFields,
      uuid: uuid,
      id_klinik: currentUser.klinik,
    });
    tooglePopUp();
  };

  const tooglePopUp = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  };

  const handlerChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const closeHandler = () => {
    setFormFields(defaultFormFields);
    tooglePopUp();
  };

  useEffect(() => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/dokter`, requestOptions)
      .then((response) => response.json())
      .then((result) => setDataDoctor(result))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    const dataFilter = dataDoctor.filter((item) =>
      item.nama_lengkap.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setDataToShow(dataFilter);
  }, [searchFilter, dataDoctor]);

  const filterHandler = (event) => {
    setSearchFilter(event.target.value);
  };

  const addDoctor = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(formFields),
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/petugasrs`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status >= 400) {
          for (let prop in result.messages) {
            toast.error(result.messages[prop], {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } else if (result) {
          tooglePopUp();
          toast.success("Account Has Been Registered", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            navigate("/admin/doctor?messege=Doctor Had Been Added");
          }, 2000);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <PerizinanContainer>
      <InputComponent
        type='text'
        onChange={filterHandler}
        placeholder='Find Doctor Name'
      />
      <DataTable columns={columns} data={dataToShow} pagination />
      {isOpen && (
        <div className='popup'>
          <div className='container'>
            <div className='card'>
              <div className='cardHeader'>
                <div className='card-title'>Doctor's Login Credential</div>
                <div className='subtitle'>
                  Please fill this form for your doctor access
                </div>
                <hr />
              </div>
              <FormComponent
                label={"Username For Doctor"}
                type='text'
                placeholder='Input username'
                onChange={handlerChange}
                name='username'
              />
              <FormComponent
                label={"Password for Doctor"}
                type='text'
                placeholder='Input password'
                onChange={handlerChange}
                name='password'
              />
              <div className='submit-container'>
                <div className='cancel' onClick={closeHandler}>
                  Cancel
                </div>
                <div className='submit' onClick={addDoctor}>
                  Submit
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </PerizinanContainer>
  );
};

const PerizinanContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .title {
    font-weight: 600;
    font-size: 16px;
    line-height: 14px;
    color: #000000;
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

  .popup {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(5px);
    padding-top: 42px;
    .card {
      padding: 16px 16px;
      background-color: white;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #333333;
      .card-title {
        font-weight: 600;
        font-size: 16px;
        line-height: 14px;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
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

export default AllDoctorTable;
