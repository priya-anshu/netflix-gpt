import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from './components/Body';
import Login from './components/Login';
import Browse from './components/Browse';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Body />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
