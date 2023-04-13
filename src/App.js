import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import HotelList from "./pages/HotelList";
import Hotel from "./pages/Hotel";
import "./app.scss"

function App() {
  return (
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/hotelList" element={<HotelList />} />
         <Route path="/hotels/:id" element={<Hotel />} /> 
       </Routes>
    </BrowserRouter>
  );
}

export default App;
