import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/signup_img.png";
import {
  GraduationCap,
  Briefcase,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { authAPI } from "../../api";

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

const SignupNew = () => {
  const [selected, setSelected] = useState<string | null>("institution");
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (authAPI.isAuthenticated()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex">
      <div className="w-full max-w-6xl grid md:grid-cols-12 grid-cols-1 ">
        {/* left artwork */}
        <div className="col-span-5 sticky top-0 hidden md:block bg-linear-to-br from-blue-900 via-indigo-900 to-black">
          <img
            src={Image}
            alt="signup art"
            className="w-full h-full object-cover"
          />
        </div>

        {/* right panel */}
        <div className="col-span-7 bg-white md:p-15 p-3 relative">
          <div className="max-w-xl mx-auto mt-20">
            <div className="mb-6 absolute md:top-10 md:left-10 top-5 left-5">
              <div className="text-3xl font-bold heading">CertiAI</div>
            </div>

            <div className="">
              <h1 className="text-2xl heading md:text-3xl font-bold text-gray-800 mb-2">
                How will you use CertiAI
              </h1>
              <p className="text-sm text-gray-500 mb-6">
                Select a role to tailor your experience for certificate
                verification
              </p>
            </div>

            <div className="grid grid-cols-1  sm:grid-cols-3 gap-6 mb-8">
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
                      className="w-18 h-18 rounded-full flex items-center justify-center mb-3"
                      style={{
                        background: `linear-gradient(135deg, ${r.from}22, ${r.to}22)`,
                      }}
                    >
                      <r.Icon size={28} color={r.from} />
                    </div>

                    <div className="text-sm font-semibold text-gray-800 text-nowrap">
                      {r.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 text-nowrap">
                      {r.desc}
                    </div>
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

            <div className="flex justify-between md:gap-15 mb-6 py-6">
              <button className=" cursor-pointer text-nowrap text-md font-bold heading flex items-center gap-2 text-sm text-[#130D3A] hover:underline">
                <ChevronLeft color="#130D3A" size={16} /> Go Back
              </button>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    navigate(`/signup/create-account?role=${selected}`);
                  }}
                  className="inline-flex items-center justify-center w-64 gap-2 bg-[#130D3A] text-white px-6 py-3 shadow-lg"
                  style={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
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

export default SignupNew;
