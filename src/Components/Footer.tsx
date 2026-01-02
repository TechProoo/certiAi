import { Linkedin, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-50 border-t border-gray-100 "
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
          <nav className="flex flex-wrap justify-center md:justify-start items-center text-sm text-gray-600  gap-3">
            <a href="/about" className="hover:underline">
              About
            </a>
            <span className="hidden md:inline text-gray-300">•</span>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
            <span className="hidden md:inline text-gray-300">•</span>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <span className="hidden md:inline text-gray-300">•</span>
            <a
              href="/api-docs"
              className="hover:underline"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/api-docs";
              }}
            >
              API Docs
            </a>
          </nav>

          <div className="flex items-center gap-3 justify-center md:justify-end">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 bg-white/90  text-gray-700  rounded-full flex items-center justify-center shadow-sm"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="w-8 h-8 bg-white/90  text-gray-700  rounded-full flex items-center justify-center shadow-sm"
            >
              <Twitter size={14} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 bg-white/90 text-gray-700 rounded-full flex items-center justify-center shadow-sm"
            >
              <Github size={14} />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          © 2025 CertiAI. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
