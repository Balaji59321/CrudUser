import "./App.css";
import Read from "./Read";
import Create from "./Create";
import Edit from "./Edit";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Link to="/">Read</Link>
      <Link to="/create">Create</Link>
      <Routes>
        <Route exact path="/" element={<Read />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/update/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
