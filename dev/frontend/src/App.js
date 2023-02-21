import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Error from "./pages/Error";
import rootStyles from "./themes/styles/rootStyles";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <div style={rootStyles}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
