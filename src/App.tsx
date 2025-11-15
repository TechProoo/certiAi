import "./App.css";
import LandingPage from "./Pages/LandingPage";
import { motion } from "framer-motion";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LandingPage />
    </motion.div>
  );
}

export default App;
