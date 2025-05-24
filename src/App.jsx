import { useState } from 'react';
import LogIn from './LogIn';
import Home from './Home';
import Beans from './Beans';
import Machines from './Machines';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Recipes from './Recipes';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/beans" element={<Beans />} /> 
        <Route path="/machines" element={<Machines />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;