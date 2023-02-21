import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Error from "./pages/Error";

function App() {
  const rootStyles = {
    height: "100vh",
    minHeight: "100vh",
    backgroundColor: "white",
  };
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
