
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './Pages/Home/Home';
import DNPInfo from './Pages/InfoEntry/DNPInfo';
import BookInfo from './Pages/Admin/Books/BookInfo';
import UpdateBookInfo from './Pages/Admin/Books/UpdateBookInfo';
import RequireAuth from './Pages/Login/RequireAuth';
import DNPReports from './Pages/Reports/DNPReports';
import CollectionReports from './Pages/Reports/CollectionReports';
import Login from './Pages/Login/Login';
import Header from './Pages/Shared/Header';
import Navbar from './Pages/Shared/Navbar';
import Users from './Pages/Admin/Users/Users';
import AddUser from './Pages/Admin/Users/AddUser';
import Books from './Pages/Admin/Books/Books';
import Offices from './Pages/Admin/Offices/Offices';


function App() {
  return (
    <>
      <div className="page-wrapper bg-gra-02  font-poppins">
        <Header></Header>
        <Routes>
          <Route path="/" element={< Home />}></Route>
          <Route path="/dnp-info" element={<RequireAuth><DNPInfo /></RequireAuth>}></Route>
          <Route path="/book-info" element={<RequireAuth><BookInfo /></RequireAuth>}></Route>
          <Route path="/books/:id" element={<RequireAuth><UpdateBookInfo /></RequireAuth>}></Route>
          <Route path="/collection-info-report" element={<RequireAuth><CollectionReports /></RequireAuth>}></Route>
          <Route path="/dnp-info-report" element={<RequireAuth><DNPReports /></RequireAuth>}></Route>
          <Route path="/users" element={<RequireAuth><Users /></RequireAuth>}></Route>
          <Route path="/books" element={<RequireAuth><Books></Books></RequireAuth>}></Route>
          <Route path="/offices" element={<RequireAuth><Offices></Offices></RequireAuth>}></Route>
          <Route path="/addUser" element={<RequireAuth><AddUser /></RequireAuth>}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div >
      <ToastContainer />
    </>
  );
}

export default App;
