import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Signup from "./Pages/SignUp/SignupNew";
import CreateAccount from "./Pages/SignUp/CreateAccount";
import { useEffect, useState } from "react";
import Loader from "./Components/Loader";
import { motion } from "framer-motion";
import Signin from "./Pages/SignUp/Signin";

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
        </Routes>
      </motion.div>
    </>
  );
}

export default App;
