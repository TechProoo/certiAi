import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { authAPI } from "../api";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = authAPI.isAuthenticated();

  const links = [
    { label: "Home", to: "/" },
    { label: "How it works", to: "/#how-it-works" },
    { label: "Features", to: "/#features" },
    {
      label: "Verify Certificate",
      to: isAuthenticated ? "/dashboard/upload" : "/signin",
    },
  ];

  return (
    <motion.header
      className="navbar bg-transparent"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="logo">
            <span className="heading text-xl font-bold">CertiAI</span>
          </div>

          {/* desktop links */}
          <nav className="hidden md:block">
            <ul className="flex gap-6 items-center text-sm text-gray-700 dark:text-gray-200">
              {links.map((link) => (
                <li key={link.label} className="hover:underline cursor-pointer">
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* desktop actions */}
          <div className="hidden md:flex gap-4">
            <Link
              to="/api-docs"
              className="text-sm px-4 py-2 rounded-md border border-white/10"
            >
              API Documentation
            </Link>
            <Link
              to={isAuthenticated ? "/dashboard" : "/signup"}
              className="text-sm px-4 py-2 rounded-md bg-white text-purple-900"
            >
              {isAuthenticated ? "Dashboard" : "Get Started"}
            </Link>
          </div>

          {/* mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden px-4 pb-6"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mx-4 rounded-lg bg-white/5 dark:bg-gray-900/80 p-4 shadow-lg">
              <ul className="flex flex-col gap-3 text-gray-800 dark:text-gray-100">
                {links.map((link) => (
                  <li key={link.label} className="py-2 border-b border-white/5">
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  to="/api-docs"
                  className="block text-center px-4 py-2 rounded-md border border-white/10"
                >
                  API Documentation
                </Link>
                <Link
                  to={isAuthenticated ? "/dashboard" : "/signup"}
                  className="block text-center px-4 py-2 rounded-md bg-white text-purple-900"
                >
                  {isAuthenticated ? "Dashboard" : "Get Started"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
