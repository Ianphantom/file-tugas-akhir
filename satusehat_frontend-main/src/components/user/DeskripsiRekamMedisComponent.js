import React from "react";
import styled from "styled-components";

import MedicInformation from "../../components/user/MedicInformation";
import ProfileCardHeader from "../../components/card/ProfileCardHeader";

// import icon
import iconNama from "../../images/svg-icon/icon-nama.svg";
import notes from "../../images/svg-icon/icon-notes.svg";
import healthHistory from "../../images/svg-icon/icon-healthHistory.svg";
import diagnose from "../../images/svg-icon/icon-diagnose.svg";
import treatment from "../../images/svg-icon/icon-treatment.svg";
import drug from "../../images/svg-icon/icon-drug.svg";
import check from "../../images/svg-icon/icon-check.svg";
import list from "../../images/svg-icon/icon-list.svg";

const DeskripsiRekamMedis = ({ dataRekamMedis }) => {
  return (
    <DeskripsiStyled>
      <div className='card-design' data-aos='fade-left' data-aos-duration='800'>
        <ProfileCardHeader
          title='Patient Information'
          desc='Information about patient'
        />
        <MedicInformation
          icon={iconNama}
          title='Patient Name'
          desc={dataRekamMedis.nama}
        />
        <MedicInformation
          icon={notes}
          title='Patient Problem'
          desc={dataRekamMedis.keluhan}
        />
        <MedicInformation
          icon={healthHistory}
          title='Health History'
          desc={dataRekamMedis.riwayat_kesehatan}
        />
      </div>
      <div className='card-design' data-aos='fade-left' data-aos-duration='800'>
        <ProfileCardHeader
          title='Physical Examination'
          desc='The results of a physical examination performed by a doctor'
        />
        <MedicInformation
          icon={check}
          title='Result'
          desc={dataRekamMedis.pemeriksaan_fisik.map(
            (item) => item.pemeriksaan_fisik
          )}
        />
      </div>
      <div className='card-design' data-aos='fade-left' data-aos-duration='800'>
        <ProfileCardHeader
          title='Medical treatment'
          desc='Diagnostic information and medical procedures provided by the doctor'
        />
        <MedicInformation
          icon={diagnose}
          title='Diagnosis'
          desc={dataRekamMedis.diagnosa.map((item) => item.diagnosa)}
        />
        <MedicInformation
          icon={treatment}
          title='Action Given'
          desc={dataRekamMedis.tindakan.map((item) => item.tindakan)}
        />
      </div>
      <div className='card-design' data-aos='fade-left' data-aos-duration='800'>
        <ProfileCardHeader
          title='Medication'
          desc='Medication given by a doctor'
        />
        {dataRekamMedis.pengobatan.map((item) => (
          <MedicInformation
            icon={drug}
            title={item.namaObat}
            desc={[item.catatan, item.lama]}
          />
        ))}
      </div>
      <div className='card-design' data-aos='fade-left' data-aos-duration='800'>
        <ProfileCardHeader title='Notes' desc='Some notes given by a doctor' />
        <MedicInformation
          icon={list}
          title='Notes'
          desc={dataRekamMedis.catatan_tambahan.map(
            (item) => item.catatan_tambahan
          )}
        />
      </div>
    </DeskripsiStyled>
  );
};

const DeskripsiStyled = styled.div`
  .card-design {
    border-radius: 8px;
    background: white;
    box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
    margin-bottom: 20px;
  }
`;

export default DeskripsiRekamMedis;
