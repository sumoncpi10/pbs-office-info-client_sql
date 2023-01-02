
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
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';
import Users from './Pages/Admin/Users/Users';
import AddUser from './Pages/Admin/Users/AddUser';
import Books from './Pages/Admin/Books/Books';
import Offices from './Pages/Admin/Offices/Offices';
import SignUP from './Pages/Login/SignUP';
import Profile from './Pages/Admin/Users/Profile';
import Posting from './Pages/Admin/Users/Posting';
import Loading from './Pages/Shared/Loading';
import { useEffect, useState } from 'react';



function App() {
  const [u, setU] = useState([]);

  useEffect(() => {
    fetch(`https://pbsofficeinfo.onrender.com/users`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setU(data);
      })
  }, []);
  if (!u) {
    return <Loading></Loading>
  }
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
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>}></Route>
          <Route path="/posting" element={<RequireAuth><Posting /></RequireAuth>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUP />}></Route>
        </Routes>
        <Footer></Footer>
      </div >
      <ToastContainer />
    </>
  );
}

export default App;
