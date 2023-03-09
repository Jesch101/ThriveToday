import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Error from "./pages/Error";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import PopularPages from "./pages/PopularPages";
import SignUp from "./pages/SignUp";
import { rootStyles, defaultStyles } from "./themes/styles/styles";
import userModel from "./context/userModel";
import UserContext from "./context/userContext";

function App() {
  const [userInfoContext, setUserInfoContext] = useState(userModel);
  useEffect(() => {
    console.log("userInfoContext updated:", userInfoContext);
  }, [userInfoContext]);
  return (
    <>
      <CssBaseline />
      <UserContext.Provider value={{ userInfoContext, setUserInfoContext }}>
        <Router>
          <div style={rootStyles}>
            <div style={defaultStyles}>
              <Navbar />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/popular-plans" element={<PopularPages />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </div>
          </div>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
