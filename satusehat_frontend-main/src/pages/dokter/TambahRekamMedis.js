import { useState, useContext } from "react";
import styled from "styled-components";
import FormComponent from "../../components/dokter/formComponent";
import { PatientContext } from "../../context/PatientContext";
import { AuthContext } from "../../context/AuthContext";
import CryptoJS from "crypto-js";
import { ENDPOINT } from "../../utils/apiEndpoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import plusIcon from "../../images/svg-icon/icon-plus.svg";
import { useNavigate, useParams } from "react-router-dom";

const defaultFormFields = {
  nama: null,
  tanggal: null,
  waktu: null,
  rumah_sakit: null,
  umur: null,
  keluhan: null,
  riwayat_kesehatan: null,
  riwayat_alergi: [],
  riwayat_penyakit: [],
  pemeriksaan_fisik: [],
  diagnosa: [],
  tindakan: [],
  pengobatan: [],
  rencana_tindak_lanjut: [],
  catatan_tambahan: [],
};

const TambahRekamMedis = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { currentPatient } = useContext(PatientContext);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(currentPatient);
  const singleInputHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const encryptData = (plaintText, aes_key) => {
    const encryptedText = CryptoJS.AES.encrypt(plaintText, aes_key).toString();
    return encryptedText;
  };

  const submitHandler = () => {
    const detailUserData = JSON.parse(localStorage.getItem("userData"));
    const stringifyData = JSON.stringify({
      ...formFields,
      nama_dokter: detailUserData.detailUser.nama_lengkap,
    });
    console.log(formFields);
    const encryptedData = encryptData(stringifyData, currentPatient.aes_key);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    let raw = JSON.stringify({
      doctorId: currentUser.uid,
      pasienId: id,
      rme: encryptedData,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${ENDPOINT}/rekammedis`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result == true) {
          toast.success("RME had been added", {
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
            navigate("/doctor/dashboard");
          }, 2000);
        } else {
          toast.error("Reinput The Data", {
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
      })
      .catch((error) => console.log("error", error));
  };

  const handleListInput = (event, index) => {
    const { name, value } = event.target;
    const updatedDiagnoses = [...formFields[name]];
    updatedDiagnoses[index] = { ...updatedDiagnoses[index], [name]: value };
    setFormFields({ ...formFields, [name]: updatedDiagnoses });
    console.log(formFields);
  };

  const handleObatInput = (event, index, key) => {
    const { name, value } = event.target;
    const updatedDiagnoses = [...formFields[name]];
    updatedDiagnoses[index] = { ...updatedDiagnoses[index], [key]: value };
    setFormFields({ ...formFields, [name]: updatedDiagnoses });
    console.log(formFields);
  };

  const [riwayatAlergi, setRiwayatAlergi] = useState([
    <FormComponent
      label={"Jenis Alergi"}
      name='riwayat_alergi'
      type='text'
      placeholder='Masukkan Jenis Alergi'
    />,
  ]);
  const [diseaseHistory, setDiseaseHistory] = useState([
    <FormComponent
      label={"Jenis Penyakit"}
      type='text'
      name='riwayat_penyakit'
      placeholder='Masukkan Jenis Penyakit'
    />,
  ]);
  const [pyschicCheck, setPyschicCheck] = useState([
    <FormComponent
      label={"Jenis Pemeriksaan Fisik"}
      type='text'
      name='pemeriksaan_fisik'
      placeholder='Masukkan Hasil Pemeriksaan'
    />,
  ]);
  const [tindakan, setTindakan] = useState([
    <FormComponent
      label={"Name Prosedur"}
      type='text'
      name='tindakan'
      placeholder='Masukkan nama prosedur'
    />,
  ]);
  const [diagnosa, setDiagnose] = useState([
    <FormComponent
      label={"Diagnosa"}
      type='text'
      name='diagnosa'
      placeholder='Masukkan Hasil Diagnosa'
    />,
  ]);

  const [pengobatanList, setPengobatanList] = useState([
    { namaObat: "", lama: "", catatan: "" },
  ]);

  const [catatan, setCatatan] = useState([
    <FormComponent
      label={"Catatan"}
      type='text'
      name='catatan_tambahan'
      placeholder='Masukkan catatan'
    />,
  ]);
  return (
    <TambahRekamMedisContainer>
      <ToastContainer />
      <div className='card-design'>
        <div className='title'>Add Electronic Medical Record</div>
        <div className='form-container'>
          <FormComponent
            label={"Patient Name"}
            type='text'
            placeholder='Enter your patient name'
            name='nama'
            onChange={singleInputHandler}
          />
          <FormComponent
            label={"Date"}
            type='date'
            name='tanggal'
            onChange={singleInputHandler}
            placeholder='Enter your patient name'
          />
          <FormComponent
            label={"Time"}
            type='time'
            name='waktu'
            onChange={singleInputHandler}
            placeholder='Enter your patient name'
          />
          <FormComponent
            label={"Hospital"}
            type='text'
            name='rumah_sakit'
            onChange={singleInputHandler}
            placeholder='Enter Your Hospital Name'
          />
          <FormComponent
            label={"Age"}
            type='text'
            name='umur'
            onChange={singleInputHandler}
            placeholder='Enter Your Patient"s age '
          />
          <FormComponent
            label={"Keluhan"}
            type='text'
            name='keluhan'
            onChange={singleInputHandler}
            placeholder='Enter Your keluhan'
          />
          <FormComponent
            label={"Riwayat Kesehatan"}
            type='text'
            name='riwayat_kesehatan'
            onChange={singleInputHandler}
            placeholder='Enter Your Patient Health History'
          />
        </div>
        <div className='newSection'>
          <div className='title-container'>
            <div className='title-section'>Riwayat Alergi</div>
            <div
              className='button-container'
              onClick={() =>
                setRiwayatAlergi((item) => [
                  ...item,
                  <FormComponent
                    label={"Jenis Alergi"}
                    type='text'
                    name='riwayat_alergi'
                    placeholder='Masukkan Jenis Alergi'
                  />,
                ])
              }
            >
              <img src={plusIcon} alt='plus-icon' />
              <div>Add</div>
            </div>
          </div>
          <div className='form-container'>
            {riwayatAlergi.map((item, index) => (
              <div
                key={index}
                onChange={(event) => handleListInput(event, index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className='newSection'>
          <div className='title-container'>
            <div className='title-section'>Disease History</div>
            <div
              className='button-container'
              onClick={() =>
                setDiseaseHistory((item) => [
                  ...item,
                  <FormComponent
                    label={"Jenis Penyakit"}
                    type='text'
                    name='riwayat_penyakit'
                    placeholder='Masukkan Jenis Penyakit'
                  />,
                ])
              }
            >
              <img src={plusIcon} alt='plus-icon' />
              <div>Add</div>
            </div>
          </div>
          <div className='form-container'>
            {diseaseHistory.map((item, index) => (
              <div
                key={index}
                onChange={(event) => handleListInput(event, index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className='newSection'>
          <div className='title-container'>
            <div className='title-section'>Pyschical Check</div>
            <div
              className='button-container'
              onClick={() =>
                setPyschicCheck((item) => [
                  ...item,
                  <FormComponent
                    label={"Jenis Pemeriksaan Fisik"}
                    type='text'
                    name='pemeriksaan_fisik'
                    placeholder='Masukkan Hasil Pemeriksaan'
                  />,
                ])
              }
            >
              <img src={plusIcon} alt='plus-icon' />
              <div>Add</div>
            </div>
          </div>
          <div className='form-container'>
            {pyschicCheck.map((item, index) => (
              <div
                key={index}
                onChange={(event) => handleListInput(event, index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className='newSection'>
          <div className='title-container'>
            <div className='title-section'>Doctor Diagnose</div>
            <div
              className='button-container'
              onClick={() =>
                setDiagnose((item) => [
                  ...item,
                  <FormComponent
                    label={"Diagnosa"}
                    type='text'
                    name='diagnosa'
                    placeholder='Masukkan Hasil Diagnosa'
                  />,
                ])
              }
            >
              <img src={plusIcon} alt='plus-icon' />
              <div>Add</div>
            </div>
          </div>
          <div className='form-container'>
            {diagnosa.map((item, index) => (
              <div
                key={index}
                onChange={(event) => handleListInput(event, index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className='newSection'>
          <div className='title-container'>
            <div className='title-section'>Tindakan</div>
            <div
              className='button-container'
              onClick={() =>
                setTindakan((item) => [
                  ...item,
                  <FormComponent
                    label={"Name Prosedur"}
                    type='text'
                    name='tindakan'
                    placeholder='Masukkan nama prosedur'
                  />,
                ])
              }
            >
              <img src={plusIcon} alt='plus-icon' />
              <div>Add</div>
            </div>
          </div>
          <div className='form-container'>
            {tindakan.map((item, index) => (
              <div
                key={index}
                onChange={(event) => handleListInput(event, index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className='newSection'>
          <div className='title-container'>
            <div className='title-section'>Pengobatan</div>
            <div
              className='button-container'
              onClick={() => {
                setPengobatanList([
                  ...pengobatanList,
                  { nama: "", lama: "", catatan: "" },
                ]);
              }}
            >
              <img src={plusIcon} alt='plus-icon' />
              <div>Add</div>
            </div>
          </div>
          <div className='form-container'>
            {pengobatanList.map((pengobatan, index) => (
              <div key={index}>
                <FormComponent
                  label={"Name Obat"}
                  type='text'
                  name='pengobatan'
                  onChange={(event) =>
                    handleObatInput(event, index, "namaObat")
                  }
                  placeholder='Masukkan Nama Obat'
                />
                <FormComponent
                  label={"Lama Konsumsi"}
                  type='text'
                  name='pengobatan'
                  onChange={(event) => handleObatInput(event, index, "lama")}
                  placeholder='Masukkan Lama Konsumsi'
                />
                <FormComponent
                  label={"Catatan"}
                  type='text'
                  name='pengobatan'
                  onChange={(event) => handleObatInput(event, index, "catatan")}
                  placeholder='Masukkan catatan'
                />
              </div>
            ))}
          </div>
        </div>
        <div className='newSection'>
          <div className='title-container'>
            <div className='title-section'>Catatan Tambahan</div>
            <div
              className='button-container'
              onClick={() =>
                setCatatan((item) => [
                  ...item,
                  <FormComponent
                    label={"Catatan"}
                    type='text'
                    name='catatan_tambahan'
                    placeholder='Masukkan catatan'
                  />,
                ])
              }
            >
              <img src={plusIcon} alt='plus-icon' />
              <div>Add</div>
            </div>
          </div>
          <div className='form-container'>
            {catatan.map((item, index) => (
              <div
                key={index}
                onChange={(event) => handleListInput(event, index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className='submit-container'>
          <div className='cancel'>Cancel</div>
          <div className='submit' onClick={submitHandler}>
            Submit
          </div>
        </div>
      </div>
    </TambahRekamMedisContainer>
  );
};

const TambahRekamMedisContainer = styled.div`
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

  .newSection {
    .title-container {
      padding: 0px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      .title-section {
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        color: #001737;
      }

      .button-container {
        cursor: pointer;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 4px;
        font-weight: 400;
        font-size: 11.375px;
        line-height: 17px;
        color: #ffffff;
        background: #2d67f6;
        border: 1px solid #556ee6;
        border-radius: 3.2px;
      }
    }
    .group-title {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      color: #001737;
      margin-bottom: 6px;
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
`;

export default TambahRekamMedis;
