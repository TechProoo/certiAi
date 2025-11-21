import { useState } from "react";
import ImageArt from "../../assets/signup_img.png";
import { Eye, EyeOff } from "lucide-react";
import Creating from "./Creating.tsx";
import { Link, useSearchParams } from "react-router-dom";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "institution";

  const isComplete =
    !!fullName.trim() &&
    !!institutionName.trim() &&
    !!email.trim() &&
    !!password &&
    !!confirmPassword;

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!institutionName.trim()) {
      setErrorMessage("Please enter your institution name.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    console.log("Create account payload:", {
      fullName,
      institutionName,
      email,
      phone,
    });
    setSubmitting(true);
  };

  if (submitting) {
    return <Creating />;
  }

  return (
    <div className="min-h-screen ">
      <div className="w-full max-w-6xl  grid grid-cols-12">
        <div className="col-span-5 sticky top-0 hidden md:block bg-neutral-900">
          <img
            src={ImageArt}
            alt="art"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-7 col-span-12  bg-white relative ">
          <div className="flex justify-center items-center mt-5 mx-auto mb-5">
            <div className=" md:w-9/12 md:mx-0 mx-3 md:ml-20 m-auto">
              <div className="text-2xl absolute left-10 top-5 font-bold text-[#130D3A] mb-6">
                CertiAI
              </div>
              <div className="mt-15">
                <h2 className="text-2xl font-semibold mb-2 text-[#130D3A]">
                  Create Account
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Fill in the nececessary details to create your Account
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs text-[#344054] mb-2">
                    {role === "employer"
                      ? "Contact Person"
                      : role === "guest"
                      ? "Guest Name"
                      : "Full Name"}
                  </label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white placeholder-gray-300"
                    placeholder={
                      role === "employer"
                        ? "Contact person name"
                        : role === "guest"
                        ? "Guest name"
                        : "First name"
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    {role === "employer"
                      ? "Company / Agency Name"
                      : "Institution Name"}
                  </label>
                  <input
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white placeholder-gray-300"
                    placeholder={
                      role === "employer"
                        ? "Company or agency name"
                        : "Institution name"
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white placeholder-gray-300"
                    placeholder="Enter Email"
                  />
                </div>

                {role === "employer" && (
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">
                      Phone
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white placeholder-gray-300"
                      placeholder="Phone number"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white placeholder-gray-300"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white placeholder-gray-300"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      className="absolute right-3 top-2 text-gray-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={!isComplete}
                    className={`w-full cursor-pointer text-white py-3 border shadow-sm transition-colors rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] ${
                      isComplete
                        ? "bg-[#130D3A] border-[#130D3A] hover:bg-[#0f0b2e]"
                        : "bg-[#130D3AB2] border-[#130D3A] text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>
                </div>

                {errorMessage && (
                  <div className="mt-4 text-sm text-red-600">
                    {errorMessage}
                  </div>
                )}

                <div className="text-xs text-center text-gray-400 mt-4">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-[#130D3A] font-medium">
                    Sign in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
