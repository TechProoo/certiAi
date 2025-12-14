import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import ImageArt from "../../assets/signup_img.png";
import Creating from "./Creating";
import { authAPI } from "../../api";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (authAPI.isAuthenticated()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const isComplete = !!email.trim() && !!password;

  const validateEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await authAPI.login({ email, password });

      if (response.success) {
        // Check if email is verified
        if (!response.data.user.isEmailVerified) {
          setErrorMessage("Please verify your email first.");
          setSubmitting(false);
          // Optionally navigate to verification page
          navigate(
            `/auth/verify?email=${encodeURIComponent(email)}&type=registration`
          );
          return;
        }

        // Navigate to dashboard on successful login
        navigate("/dashboard");
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || "Login failed. Please check your credentials."
      );
      setSubmitting(false);
    }
  };

  if (submitting) return <Creating />;

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
                    Log In
                  </h2>
                  <p className="text-sm text-gray-400 mb-6">
                    Welcome back! Please enter your details.
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
                    <label className="block text-xs text-gray-600 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white placeholder-gray-300"
                        placeholder="Enter Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    {" "}
                    <Link
                      to={"forgot-password"}
                      className="text-blue-500 text-sm mb-3"
                    >
                      Forgot password?
                    </Link>
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
                      Sign in
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="mt-4 text-sm text-red-600">
                      {errorMessage}
                    </div>
                  )}

                  <div className="text-xs text-center text-gray-400 mt-4">
                    New to CertiAI?{" "}
                    <Link to="/signup" className="text-[#130D3A] font-medium">
                      Sign up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
