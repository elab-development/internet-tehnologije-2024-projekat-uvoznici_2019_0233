import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import SidebarMenu from "./components/SidebarMenu";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Suppliers from "./pages/Suppliers";
import Products from "./pages/Products";
import Documents from "./pages/Documents";
import ChatBot from "./pages/ChatBot";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Admin from "./pages/Admin";


function App() {
  return (
    <>
        <BrowserRouter>
          <Container fluid>
              <Row>
                  <Col md={2} className="sidebar">
                      <SidebarMenu />
                  </Col>
                  <Col md={10}>
                      <Routes>
                          <Route path="/" element={<Home/>} />
                          <Route path="/suppliers" element={<Suppliers />} />
                          <Route path="/products" element={<Products/>} />
                          <Route path="/documents" element={<Documents/>} />
                          <Route path="/chat" element={<ChatBot />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/admin" element={<Admin />} />
                      </Routes>
                  </Col>
              </Row>
          </Container>
            <Row>
                <Col md={12}>
                    <Footer />
                </Col>
            </Row>
        </BrowserRouter>
    </>
  );
}

export default App;
