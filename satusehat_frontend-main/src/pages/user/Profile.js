import React, { useEffect } from "react";
import styled from "styled-components";

// import components
import ProfileCardHeader from "../../components/card/ProfileCardHeader";
import ProfileSectionItem from "../../components/user/ProfileSectionItem";
import ProfileMainInformation from "../../components/user/ProfileMainInformation";

// import icon
import iconNama from "../../images/svg-icon/icon-nama.svg";
import calendar from "../../images/svg-icon/icon-calender.svg";
import email from "../../images/svg-icon/icon-mail.svg";
import phone from "../../images/svg-icon/icon-phone.svg";
import password from "../../images/svg-icon/icon-password.svg";
import settings from "../../images/svg-icon/icon-settings.svg";
import id from "../../images/svg-icon/icon-id.svg";

// import profile default
import profileDefault from "../../images/profile-default.png";

// import aos
import AOS from "aos";
import "aos/dist/aos.css";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <ProfileContainer>
      <div
        className='profileTop card-design'
        data-aos='fade-up'
        data-aos-duration='1000'
      >
        <div className='profileUser'>
          <div className='photo-user'>
            <img src={profileDefault} alt='User-Profile' />
          </div>
        </div>
        <div className='main-information'>
          <div className='main-information-data'>
            <ProfileMainInformation
              icon={id}
              text='BPJS ID'
              result={userData.nomor_bpjs}
              isVerified={false}
            />
            <ProfileMainInformation
              icon={email}
              text='Email Utama'
              result={userData.email}
              isVerified={true}
            />
          </div>
          <div className='main-information-data'>
            <ProfileMainInformation
              icon={phone}
              text='Nomor Ponsel'
              result={userData.nomor_telepon}
              isVerified={false}
            />
            <ProfileMainInformation
              icon={email}
              text='Email Alternatif'
              result={userData.email}
              isVerified={true}
            />
          </div>
        </div>
      </div>
      <div className='card-design' data-aos='fade-up' data-aos-duration='1500'>
        <ProfileCardHeader
          title='Informasi Pribadi'
          desc='Data yang umumnya ditampilkan pada aplikasi satu sehat'
        />
        <ProfileSectionItem
          icon={iconNama}
          title='Nama'
          desc='Ubah nama lengkap dan nama panggilan'
        />
        <ProfileSectionItem
          icon={calendar}
          title='Tanggal Lahir'
          desc='Melihat tanggal lahir'
        />
      </div>
      <div
        className='card-design'
        data-aos='fade-up'
        data-aos-duration='1500'
        data-aos-delay='300'
      >
        <ProfileCardHeader title='Kontak' desc='Ubah email dan nomor ponsel' />
        <ProfileSectionItem
          icon={email}
          title='Email'
          desc='Perbarui dan verifikasi email'
        />
        <ProfileSectionItem
          icon={phone}
          title='Nomor Ponsel'
          desc='Perbarui dan verifikasi nomor telepon'
        />
      </div>
      <div
        className='card-design'
        data-aos='fade-up'
        data-aos-duration='1500'
        data-aos-delay='500'
      >
        <ProfileCardHeader
          title='Informasi Pribadi'
          desc='Data yang umumnya ditampilkan pada aplikasi satu sehat'
        />
        <ProfileSectionItem
          icon={password}
          title='Kata Sandi'
          desc='Perbarui kata sandi'
        />
        <ProfileSectionItem
          icon={settings}
          title='Pengaturan Web'
          desc='Sesuaikan preferensi tampilan'
        />
      </div>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .profileTop {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 25px;
    padding: 16px 16px;
    .profileUser {
      display: flex;
      gap: 25px;
    }

    .main-information {
      display: flex;
      gap: 20px;
      .main-information-data {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }
  }
  .card-design {
    border-radius: 8px;
    background: white;
    box-shadow: 0px 12px 24px rgba(18, 38, 63, 0.03);
  }

  @media (max-width: 1000px) {
    margin-left: 0px;
    .profileTop {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .profileUser {
        justify-content: flex-start;
      }
      .main-information {
        flex-direction: column;
        width: 100%;
      }
    }
  }
`;

export default Profile;
