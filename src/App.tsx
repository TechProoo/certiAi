import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Signup from "./Pages/auth/SignupNew";
import CreateAccount from "./Pages/auth/CreateAccount";
import { useEffect, useState } from "react";
import Loader from "./Components/Loader";
import { motion } from "framer-motion";
import Signin from "./Pages/auth/Signin";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import VerifyCode from "./Pages/auth/VerifyCode";
import ResetPassword from "./Pages/auth/ResetPassword";
import ResetSuccess from "./Pages/auth/ResetSuccess";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onLoad = () => setLoading(false);
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      const t = setTimeout(onLoad, 1200);
      return () => {
        window.removeEventListener("load", onLoad);
        clearTimeout(t);
      };
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route index element={<LandingPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/signup/create-account"
            element={<CreateAccount />}
          ></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route
            path="/signin/forgot-password"
            element={<ForgotPassword />}
          ></Route>
          <Route path="/auth/verify" element={<VerifyCode />}></Route>
          <Route path="/auth/reset-password" element={<ResetPassword />}></Route>
          <Route path="/auth/reset-success" element={<ResetSuccess />}></Route>
        </Routes>
      </motion.div>
    </>
  );
}

export default App;
