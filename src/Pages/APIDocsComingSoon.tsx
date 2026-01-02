// Removed unused React import
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const APIDocsComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-900 via-purple-700 to-indigo-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-lg w-full text-center p-10 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20"
      >
        <div className="flex flex-col items-center gap-4">
          <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="32" fill="#7C3AED" fillOpacity="0.15" />
            <path
              d="M32 18v20m0 8h.02"
              stroke="#7C3AED"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
            API Documentation
          </h1>
          <p className="text-lg md:text-xl mb-4 text-white/80">
            Our API documentation is{" "}
            <span className="font-semibold text-purple-200">coming soon</span>.
            <br />
            We are working hard to make it available for you!
          </p>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-3 rounded-lg bg-linear-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default APIDocsComingSoon;
