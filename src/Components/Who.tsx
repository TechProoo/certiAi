import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import Star1 from "../assets/one.png";
import Star2 from "../assets/two.png";
import Star3 from "../assets/three.png";
import Star4 from "../assets/four.png";
import { Link } from "react-router-dom";

const Who = () => {
  return (
    <motion.div
      className="w-10/12 who_cover m-auto md:mt-30 mt-20"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mt-20 who_content">
        <h1 className=" text-center">
          Who is <span>CartiAI </span> for
        </h1>
        <div className="divider"></div>
        <div className="md:flex gap-25 justify-between items-center">
          <div className="d_content">
            <h1 className="">Universities</h1>
            <p className="">
              Verify applicant credentials during admissions to ensure
              legitimacy and originality
            </p>
          </div>
          <div className="d_content">
            <h1 className="">Organizations</h1>
            <p className="">
              Authenticate educational qualifications of candidates
            </p>
          </div>
          <div className="d_content">
            <h1 className="">Students/ Employees</h1>
            <p className="">
              Ensure the authenticity of your own certificates before sending
              the
            </p>
          </div>
        </div>
      </div>
      <div className="who_bottom md:mt-50 mt-20">
        <motion.div
          className="who_bottom_cover relative rounded-2xl overflow-hidden py-14 px-6 md:px-12 "
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.25 }}
        >
          {/* Decorative corner stars */}
          <img
            src={Star1}
            alt="star-1"
            className="absolute left-0 top-0 w-40 opacity-60 pointer-events-none"
          />
          <img
            src={Star2}
            alt="star-2"
            className="absolute right-8 top-8 w-10 opacity-60 pointer-events-none"
          />
          <img
            src={Star3}
            alt="star-3"
            className="absolute left-50 top-8 w-8 opacity-50 pointer-events-none"
          />
          <img
            src={Star4}
            alt="star-4"
            className="absolute right-50 bottom-20 w-12 opacity-50 pointer-events-none"
          />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">
              Start verifying certificates in seconds.
            </h1>
            <p className="text-gray-300 mt-3">
              Comprehensive tools for accurate and efficient certificate
              verification
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-15 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition font-medium"
                  style={{ borderRadius: "9999px" }}
                >
                  Get Started
                  <MoveRight className="ml-3" size={20} />
                </Link>
              </motion.div>

              <motion.a
                href="/api-docs"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/api-docs";
                }}
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/5 transition"
                whileHover={{ scale: 1.02 }}
              >
                <span className="font-medium">API Documentation</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Who;
