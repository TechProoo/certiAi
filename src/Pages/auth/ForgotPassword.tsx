import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ImageArt from "../../assets/signup_img.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const isComplete = !!email.trim();

  const validateEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    // Navigate to verification code entry page with the email as a query param
    navigate(`/auth/verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <div>
      <div className="min-h-screen ">
        <div className="w-full max-w-6xl  grid grid-cols-12">
          <div className="h-screen col-span-5 sticky top-0 hidden md:block bg-neutral-900">
            <img
              src={ImageArt}
              alt="art"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-7 col-span-12  bg-white relative ">
            <div className="flex justify-center items-center mt-5 md:mt-20 mx-auto mb-5">
              <div className=" md:w-9/12 md:mx-0 mx-3 md:ml-20 m-auto">
                <div className="text-2xl absolute left-10 top-5 font-bold text-[#130D3A] mb-6">
                  CertiAI
                </div>
                <div className="mt-15">
                  <h2 className="text-2xl font-semibold mb-2 text-[#130D3A]">
                    Forgot password?
                  </h2>
                  <p className="text-sm text-gray-400 mb-6">
                    No worries, we’ll send you reset instructions.
                  </p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-xs text-[#344054] mb-2">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white placeholder-gray-300"
                      placeholder="Enter Email"
                    />
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
                      Reset Password
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="mt-4 text-sm text-red-600">
                      {errorMessage}
                    </div>
                  )}

                  <Link
                    to="/signin"
                    className="text-xs text-center flex gap-2 items-center justify-center text-gray-400 mt-4"
                  >
                    <ArrowLeft />
                    <span className="text-[#130D3A] font-medium">
                      Back to Login
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
