import React, { useRef, useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import ImageArt from "../../assets/signup_img.png";

const CODE_LENGTH = 5;

const VerifyCode: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const navigate = useNavigate();

  const [values, setValues] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, v: string) => {
    if (!/^[0-9]*$/.test(v)) return;
    const char = v.slice(-1);
    const next = [...values];
    next[index] = char;
    setValues(next);
    if (char && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      if (values[idx]) {
        const next = [...values];
        next[idx] = "";
        setValues(next);
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < CODE_LENGTH - 1)
      inputsRef.current[idx + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text").trim();
    const digits = pasted.replace(/\D/g, "").slice(0, CODE_LENGTH).split("");
    if (digits.length === 0) return;
    const next = Array(CODE_LENGTH).fill("");
    for (let i = 0; i < digits.length; i++) next[i] = digits[i];
    setValues(next);
    const focusIndex = Math.min(digits.length, CODE_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const code = values.join("");
  const isComplete = code.length === CODE_LENGTH;

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    // Simulated verification: accept code '12345'
    if (!isComplete) return setError("Please enter the 5-digit code.");
    if (code !== "12345") {
      setError("Wrong Code! Try Again");
      return;
    }

    // On success, navigate to reset password page
    navigate(`/auth/reset-password?email=${encodeURIComponent(email)}`);
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

              <div className="mt-20">
                <h2 className="text-2xl font-semibold mb-2 text-[#130D3A]">
                  Check Your Email
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  We sent a 5 digit code to {email || "your email"}
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    Enter Code
                  </label>
                  <div className="flex gap-3">
                    {values.map((v, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          inputsRef.current[i] = el;
                        }}
                        value={v}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        onPaste={handlePaste}
                        className="w-10 h-10 text-center border border-gray-200 rounded-md"
                        maxLength={1}
                        inputMode="numeric"
                      />
                    ))}
                  </div>
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}

                <div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isComplete}
                    className={`w-full text-white py-3 rounded-md border shadow-sm transition-colors ${
                      isComplete
                        ? "bg-[#130D3A] border-[#130D3A]"
                        : "bg-[#130D3AB2] border-[#130D3A] text-gray-500"
                    }`}
                  >
                    Reset Password
                  </button>
                </div>

                <div className="text-xs text-center text-gray-400 mt-4">
                  <Link to="/signin" className="text-[#130D3A] font-medium">
                    ← Back To Login
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

export default VerifyCode;
