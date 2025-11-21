import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ImageArt from "../../assets/signup_img.png";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isComplete = password.length >= 8 && confirmPassword.length >= 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: call API to update the password for `email`.
    // For now navigate to the success page.
    navigate("/auth/reset-success");
  };

  return (
    <div className="min-h-screen ">
      <div className="w-full max-w-6xl  grid grid-cols-12">
        <div className="col-span-5 h-screen sticky top-0 hidden md:block bg-neutral-900">
          <img
            src={ImageArt}
            alt="art"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-7 col-span-12 bg-white relative">
          <div className="flex justify-center items-center mt-5 mx-auto mb-5">
            <div className="md:w-9/12 md:mx-0 mx-3 md:ml-20 m-auto">
              <div className="text-2xl absolute left-10 top-5 font-bold text-[#130D3A] mb-6">
                CertiAI
              </div>

              <div className="mt-20 max-w-sm">
                <h2 className="text-2xl font-semibold mb-2 text-[#130D3A]">
                  Set new password
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Your new password must be different to previously used
                  passwords.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
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
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Must be at least 8 characters
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white placeholder-gray-300"
                        placeholder="Confirm Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((s) => !s)}
                        className="absolute right-3 top-2 text-gray-400"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!isComplete}
                      className={`w-full text-white py-3 rounded-md border shadow-sm transition-colors ${
                        isComplete
                          ? "bg-[#130D3A] border-[#130D3A] hover:bg-[#0f0b2e]"
                          : "bg-[#130D3AB2] border-[#130D3A] text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Reset Password
                    </button>
                  </div>

                  {error && (
                    <div className="mt-4 text-sm text-red-600">{error}</div>
                  )}

                  <div className="text-xs text-center text-gray-400 mt-4">
                    <button
                      type="button"
                      className="text-[#130D3A]"
                      onClick={() => navigate("/signin")}
                    >
                      ← Back to login
                    </button>
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

export default ResetPassword;
