import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";


function App() {
  const [dark, setDark] = useState(false);
  const toggleDark = () => setDark((d) => !d);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen transition-colors duration-300">
        <BrowserRouter>
          <Routes>
            
              <Route path="/" element={<Home dark={dark} />} />
              <Route path="/about" element={<About dark={dark} />} />
              <Route path="/services" element={<Services dark={dark} />} />
              <Route path="/work" element={<Work dark={dark} />} />
              <Route path="/contact" element={<Contact dark={dark} />} />
            
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;