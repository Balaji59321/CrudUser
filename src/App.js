import "./App.css";
import Read from "./Read";
import Create from "./Create";
import Edit from "./Edit";
import Nav from "./Nav";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import ContextProvider from "./ContextProvider";
import { initialValue, reducer } from "./util";

function App() {
  return (
    <ContextProvider initialValue={initialValue} reducer={reducer}>
      <BrowserRouter>
        {/* <Link to="/">Read</Link>
      <Link to="/create">Create</Link> */}
        <Nav />
        <Routes>
          <Route exact path="/" element={<Read />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/update/:id" element={<Edit />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
