import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/signup_img.png";
import {
  GraduationCap,
  Briefcase,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const roles = [
  {
    id: "institution",
    title: "Academic Institution",
    desc: "For verifying",
    Icon: GraduationCap,
    from: "#246AE9",
    to: "#DBEAFE",
  },
  {
    id: "employer",
    title: "Employer / Agency",
    desc: "For verifying candidates",
    Icon: Briefcase,
    from: "#EC36C9",
    to: "#FFCAF5",
  },
  {
    id: "guest",
    title: "Guest / Public",
    desc: "For one off checks",
    Icon: User,
    from: "#00C033",
    to: "#BEFFCF",
  },
];

const Signup = () => {
  const [selected, setSelected] = useState<string | null>("institution");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      <div className="w-full max-w-6xl grid md:grid-cols-12 grid-cols-1 mx-auto">
        <div className="col-span-4 hidden md:block bg-linear-to-br from-blue-900 via-indigo-900 to-black">
          <img
            src={Image}
            alt="signup art"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-8 bg-white md:p-15 relative">
          <div className="max-w-xl mx-auto mt-25">
            <div className="mb-6 absolute top-10 left-10">
              <div className="text-3xl font-bold heading">CertiAI</div>
            </div>

            <h1 className="text-2xl heading md:text-3xl font-bold text-gray-800 mb-2">
              How will you use CertiAI
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Select a role to tailor your experience for certificate
              verification
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {roles.map((r) => (
                <label
                  key={r.id}
                  className={`relative cursor-pointer block p-6 rounded-lg border transition-all duration-200 ${
                    selected === r.id
                      ? "border-2 border-green-600 bg-white shadow-sm"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r.id}
                    checked={selected === r.id}
                    onChange={() => setSelected(r.id)}
                    className="sr-only"
                  />

                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                      style={{
                        background: `linear-gradient(135deg, ${r.from}22, ${r.to}22)`,
                      }}
                    >
                      <r.Icon size={28} color={r.from} />
                    </div>

                    <div className="text-sm font-semibold text-gray-800">
                      {r.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{r.desc}</div>
                  </div>

                  <div className="absolute top-3 right-3">
                    {selected === r.id ? (
                      <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                </label>
              ))}
            </div>

            <div className="relative mb-6 py-6">
              <button className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm text-gray-600 hover:underline">
                <ChevronLeft size={16} /> Go Back
              </button>

              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="inline-flex items-center gap-2 bg-purple-900 hover:bg-purple-800 text-white px-12 py-3 rounded-xl"
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/signin" className="text-purple-700 font-medium">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
