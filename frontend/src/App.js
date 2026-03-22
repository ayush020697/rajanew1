import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collection";
import Stores from "./pages/Stores";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import ResponsibleDrinking from "./pages/ResponsibleDrinking";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/responsible-drinking" element={<ResponsibleDrinking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
