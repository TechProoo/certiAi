import { Brain, FileText, Code, Download, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const cardsTop = [
  {
    title: "AI Detection",
    desc: "Advanced machine learning algorithms detect forgery patterns and anomalies with high accuracy.",
    Icon: Brain,
    color: "#06b6d4",
  },
  {
    title: "OCR Text Extraction",
    desc: "Extract and validate all text fields from certificates automatically using Optical Character Recognition.",
    Icon: FileText,
    color: "#e11d48",
  },
  {
    title: "API Integration",
    desc: "Seamlessly integrate certificate verification into your existing systems with our RESTful API.",
    Icon: Code,
    color: "#7c3aed",
  },
];

const cardsBottom = [
  {
    title: "PDF Reports",
    desc: "Generate comprehensive verification reports in PDF format for record-keeping and compliance.",
    Icon: Download,
    color: "#06b6d4",
  },
  {
    title: "Secure Storage",
    desc: "All certificate data is encrypted and stored securely with enterprise-grade security measures.",
    Icon: ShieldCheck,
    color: "#10b981",
  },
];

const Features = () => {
  return (
    <motion.section
      className="features_cover py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-white">
          Features
        </h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
          Comprehensive tools for accurate and efficient certificate
          verification
        </p>

        {/* Top row: 3 cards */}
        <div className="grid md:w-11/12 m-auto gap-6 feature_card md:grid-cols-3 grid-cols-1 mb-8">
          {cardsTop.map((c) => (
            <motion.article
              key={c.title}
              className="rounded-lg p-7 border border-white/10 backdrop-blur-sm"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent ">
                  <c.Icon size={33} color={c.color} strokeWidth={1.8} />
                </div>
                <div className="mt-6">
                  <h3 className="text-white text-sm font-semibold mb-2">
                    {c.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{c.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom row: 2 centered cards */}
        <div className="md:w-7/12 grid gap-6 grid-cols-2 max-w-4xl mx-auto">
          {cardsBottom.map((c) => (
            <motion.article
              key={c.title}
              className="rounded-lg p-7 border border-white/10 backdrop-blur-sm"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent ">
                  <c.Icon size={33} color={c.color} strokeWidth={1.8} />
                </div>
                <div className="mt-6">
                  <h3 className="text-white text-sm font-semibold mb-2">
                    {c.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{c.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
