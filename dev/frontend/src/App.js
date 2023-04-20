import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Error from "./pages/Error";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import PopularPages from "./pages/PopularPages";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { rootStyles, defaultStyles, pageStyles } from "./themes/styles/styles";
import userModel from "./context/userModel";
import UserContext from "./context/userContext";
import axiosInstance from "./axios";
import Loader from "./components/Loader";
import CreatePlan from "./pages/CreatePlan";
import ViewPlan from "./pages/ViewPlan";
import TagPlans from "./pages/TagPlans";

function App() {
  const [userInfoContext, setUserInfoContext] = useState(userModel);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isBoxBackground, setIsBoxBackground] = useState(false);

  const getUserInfo = () => {
    setLoading(true);
    axiosInstance
      .get(`/users/get-user-info`)
      .then((res) => {
        const result = res.data;
        setUserInfoContext(result);
        setLoggedIn(true);
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <CssBaseline />
      <UserContext.Provider value={{ userInfoContext, setUserInfoContext }}>
        <Router>
          <div style={rootStyles}>
            <div style={isBoxBackground ? pageStyles : defaultStyles}>
              <Navbar />
              {loading ? (
                <Loader />
              ) : (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/login"
                    element={<SignIn setLoggedIn={setLoggedIn} />}
                  />
                  <Route
                    path="/popular-plans"
                    element={
                      <PopularPages setBackground={setIsBoxBackground} />
                    }
                  />
                  <Route
                    path="/sign-up"
                    element={<SignUp setLoggedIn={setLoggedIn} />}
                  />
                  {isLoggedIn ? (
                    <Route
                      path="/profile"
                      element={<Profile setBackground={setIsBoxBackground} />}
                    />
                  ) : (
                    <Route
                      path="/profile"
                      element={<Navigate to="/login" replace />}
                    />
                  )}
                  {isLoggedIn ? (
                    <Route
                      path="/add-plan"
                      element={
                        <CreatePlan setBackground={setIsBoxBackground} />
                      }
                    />
                  ) : (
                    <Route
                      path="/add-plan"
                      element={<Navigate to="/login" replace />}
                    />
                  )}
                  <Route
                    path="/view-plan/:planid"
                    element={<ViewPlan setBackground={setIsBoxBackground} />}
                  />
                  <Route
                    path="/plans-by-tag/:tag"
                    element={<TagPlans setBackground={setIsBoxBackground} />}
                  />
                  <Route path="*" element={<Error />} />
                </Routes>
              )}
            </div>
          </div>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
