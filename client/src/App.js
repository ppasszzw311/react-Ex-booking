import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import HotelList from "./pages/HotelList";
import Hotel from "./pages/Hotel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./app.scss"

function App() {
  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/hotelList" element={<HotelList />} />
         <Route path="/hotels/:id" element={<Hotel />} /> 
         <Route path="/Login" element={<Login />} />
         <Route path="/Register" element={<Register />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
