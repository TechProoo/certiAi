import Star from "../assets/star.png";
import { UploadCloud, FileSearch, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Upload",
    desc: "Upload the educational certificate you want to verify in PDF or image format.",
    color: "#06b6d4", // teal
    Icon: UploadCloud,
  },
  {
    title: "Analyze",
    desc: "Our AI-powered system extracts and analyzes all text and visual elements using OCR and Computer Vision.",
    color: "#e11d48", // magenta-ish
    Icon: FileSearch,
  },
  {
    title: "Verify",
    desc: "Get instant verification results with a detailed report highlighting any anomalies or forgery indicators.",
    color: "#10b981", // green
    Icon: CheckCircle,
  },
];

const HowItWorks = () => {
  return (
    <motion.section
      className="h_i_w relative py-25"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* decorative star */}
      <img
        src={Star}
        className="star absolute left-6 top-6 w-15 opacity-60"
        alt="decorative star"
      />

      <div className="h_i_w_content max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl heading md:text-4xl font-extrabold mb-3 ">
          How it works
        </h2>
        <p className="max-w-2xl mx-auto mb-12">
          Simple three-step process to verify any educational certificate
        </p>

        <div className="md:flex justify-between items-start gap-8">
          {steps.map((s) => (
            <div key={s.title} className="flex-1 text-center px-4">
              <div
                className="mx-auto w-25 h-25 rounded-full shadow-md flex items-center justify-center mb-3"
                aria-hidden
              >
                {/* lucide icon */}
                <s.Icon size={40} strokeWidth={1.8} color={s.color} />
              </div>
              <h3 className="text-lg font-semibold mb-2 heading">{s.title}</h3>
              <p className="text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
