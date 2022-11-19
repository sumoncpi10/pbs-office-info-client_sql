
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './Pages/Home/Home';
import DNPInfo from './Pages/InfoEntry/DNPInfo';
import RequireAuth from './Pages/Login/RequireAuth';
import DNPReports from './Pages/Reports/DNPReports';
import Login from './Pages/Login/Login';
import Header from './Pages/Shared/Header';
import Navbar from './Pages/Shared/Navbar';

function App() {
  return (
    <>
      <div className="page-wrapper bg-gra-02  font-poppins">
        <Header></Header>
        <Routes>
          <Route path="/" element={< Home />}></Route>
          <Route path="/dnp-info" element={<RequireAuth><DNPInfo /></RequireAuth>}></Route>
          <Route path="/dnp-info-report" element={<RequireAuth><DNPReports /></RequireAuth>}></Route>
          <Route path="/login" element={
            <Login />
          }></Route>
        </Routes>

      </div >
      <ToastContainer />
    </>
  );
}

export default App;
