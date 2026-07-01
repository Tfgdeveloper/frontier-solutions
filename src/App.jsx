import React, { useState } from "react";
import Header from './components/layout/Header';
import Home from './pages/Home';



function App() {
  const [dark, setDark] = useState(false);
  return (
<div className={dark ? "dark" : ""}>
     
      <div className="min-h-screen transition-colors duration-300">
        <Header  dark={dark} toggleDark={() => setDark(!dark)} />
        
       <Home dark={dark} />
      </div>
</div>
  );
}

export default App;
