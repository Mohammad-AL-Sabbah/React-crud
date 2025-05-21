import Home from "./pages/Home/Home.jsx";
import Nav from "./components/Navbar/Nav.jsx";
import Create from "./pages/Create/Create.jsx";
import Details from "./pages/Details/Details.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Edit from "./pages/Edit/Edit.jsx";
import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <>
    <Nav />
    <Routes>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/create" element={<Create/>}></Route>
      <Route path="/details/:userId" element={<Details/>}></Route>
      <Route path="/edit/:userId" element={<Edit/>}></Route>
  
    </Routes>
    <Footer />
    </>
  )
 
}

export default App
