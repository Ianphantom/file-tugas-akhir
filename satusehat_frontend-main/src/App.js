import { Routes, Route } from "react-router-dom";

import ProtectedRoutesPatient from "./routes/ProtectedRoutesPatient";
import ProtectedRoutesAdmin from "./routes/ProtectedRoutesAdmin";
import ProtectedRoutesDoctor from "./routes/ProtectedRoutesDoctor";
import ProtectedRoutesRME from "./routes/ProtectedRoutesRME";

// import components
import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/header/CompoundHeader";
import Footer from "./components/Footer";

// import Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Service from "./pages/Service";
import Contact from "./pages/Contact";

// import user page
import Dashboard from "./pages/user/Dashboard";
import RekamMedis from "./pages/user/RekamMedis";
import Perizinan from "./pages/user/Perizinan";
import Profile from "./pages/user/Profile";
import DetailPerizinan from "./pages/user/DetailPerizinan";
import DetailRekamMedis from "./pages/user/DetailRekamMedis";

// import dokter page
import DokterLogin from "./pages/dokter/DokterLogin";
import DokterRegister from "./pages/dokter/DokterRegister";
import DokterRekamMedis from "./pages/dokter/DokterRekamMedis";
import DokterDetailRekamMedis from "./pages/dokter/DokterDetailRekamMedis";
import TambahRekamMedis from "./pages/dokter/TambahRekamMedis";
import DokterDashboard from "./pages/dokter/DokterDashboard";
import DokterPerizinan from "./pages/dokter/DokterPerizinan";

// import admin page
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPerizinan from "./pages/admin/AdminPerizinan";
import AdminDokterList from "./pages/admin/AdminDokterList";
import AdminRequest from "./pages/admin/AdminRequest";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminAddDoctor from "./pages/admin/AdminAddDoctor";

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/service' element={<Service />} />
        <Route path='/contact' element={<Contact />} />
        <Route
          path='/user'
          element={<ProtectedRoutesPatient roles={["pasien"]} />}
        >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='rekam-medis' element={<RekamMedis />} />
          <Route path='rekam-medis/:id' element={<DetailRekamMedis />} />
          <Route path='perizinan' element={<Perizinan />} />
          <Route path='perizinan/:id' element={<DetailPerizinan />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/doctor/login' element={<DokterLogin />} />
        <Route path='/doctor/register' element={<DokterRegister />} />
        <Route
          path='/doctor'
          element={<ProtectedRoutesRME roles={["dokter"]} />}
        >
          <Route
            path='/doctor/rekam-medis/:id'
            element={<DokterDetailRekamMedis />}
          />
          <Route
            path='/doctor/tambah-rekam-medis/:id'
            element={<TambahRekamMedis />}
          />
        </Route>
        <Route
          path='/doctor'
          element={<ProtectedRoutesDoctor roles={["dokter"]} />}
        >
          <Route path='rekam-medis' element={<DokterRekamMedis />} />
          <Route path='dashboard' element={<DokterDashboard />} />
          <Route path='permission' element={<DokterPerizinan />} />
        </Route>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route
          path='/admin'
          element={<ProtectedRoutesAdmin roles={["admin"]} />}
        >
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='perizinan' element={<AdminPerizinan />} />
          <Route path='doctor' element={<AdminDokterList />} />
          <Route path='add-permission' element={<AdminRequest />} />
          <Route path='add-doctor' element={<AdminAddDoctor />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
