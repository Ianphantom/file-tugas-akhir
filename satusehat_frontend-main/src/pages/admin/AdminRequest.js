import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import Select from "react-select";

// import component
import FormComponent from "../../components/dokter/formComponent";
// toast component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ENDPOINT } from "../../utils/apiEndpoint";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const permissionOptions = [
  { value: 1, label: "Read", name: "akses" },
  { value: 2, label: "Read and Write", name: "akses" },
];

const durationOptions = [
  { value: 60, label: "60 Minutes", name: "durasi" },
  { value: 120, label: "120 Minutes", name: "durasi" },
  { value: 180, label: "180 Minutes", name: "durasi" },
  { value: 240, label: "240 Minutes", name: "durasi" },
];

const defaultFormFields = {
  uuid_petugas_rs: null,
  uuid_pasien: null,
  keterangan: null,
  durasi: null,
  alasan: null,
  akses: null,
};

const AdminRequest = () => {
  const navigate = useNavigate();
  const [allPatient, setAllPatient] = useState([]);
  const [allDoctor, setAllDoctor] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const onChangeHandler = (event) => {
    const keyName = event.name;
    const keyValue = event.value;
    setFormFields({ ...formFields, [keyName]: keyValue });
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const submitForm = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.token}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(formFields),
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/perizinan`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 400) {
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
          toast.success("Data has been submitted", {
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
            navigate("/admin/perizinan");
          }, 2000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/pasien`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const formattedOptions = result.map((item) => ({
          value: item.uuid,
          label: `${item.nama_lengkap} | ${item.nomor_bpjs}`,
          name: "uuid_pasien",
        }));

        setAllPatient(formattedOptions);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/petugasrs/klinik/${currentUser.klinik}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const formattedOptions = result.map((item) => ({
          value: item.uuid,
          label: `${item.nama_lengkap}`,
          name: "uuid_petugas_rs",
        }));

        setAllDoctor(formattedOptions);
      })
      .catch((error) => console.log("error", error));
  }, [currentUser]);
  return (
    <AdminRequestContainer className='card-design'>
      <ToastContainer />
      <div className='title'>Add Permission</div>
      <div className='form-container'>
        <SelectStyled
          options={allPatient}
          placeholder='Enter Patient Name'
          onChange={onChangeHandler}
        />
        <SelectStyled
          options={allDoctor}
          placeholder='Enter Doctor Name'
          name='uuid_petugas_rs'
          onChange={onChangeHandler}
        />
        <SelectStyled
          options={permissionOptions}
          placeholder='Enter Permission Request'
          onChange={onChangeHandler}
        />
        <SelectStyled
          options={durationOptions}
          placeholder='Enter Duration'
          onChange={onChangeHandler}
          name='durasi'
        />
        <FormComponent
          label={"Keterangan"}
          type='text'
          name='keterangan'
          placeholder='Enter Information'
          onChange={inputHandler}
        />
        <textarea
          name='alasan'
          id='alasan'
          defaultValue={""}
          onChange={inputHandler}
        ></textarea>
      </div>
      <div className='submit-container'>
        <div className='cancel'>Cancel</div>
        <div className='submit' onClick={submitForm}>
          Submit
        </div>
      </div>
    </AdminRequestContainer>
  );
};

const SelectStyled = styled(Select)`
  width: 100%;
  background: #ffffff;
  border-radius: 6px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

const AdminRequestContainer = styled.div`
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

  textarea {
    padding: 10px 10px;
    border: 1px solid #ccd6ef;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
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

export default AdminRequest;
