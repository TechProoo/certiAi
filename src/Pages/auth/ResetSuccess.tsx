import React from "react";
import { useNavigate } from "react-router-dom";
import ImageArt from "../../assets/signup_img.png";

const ResetSuccess: React.FC = () => {
  const navigate = useNavigate();

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
            <div className="md:w-9/12 md:mx-0 mx-3 md:ml-20 m-auto text-center">
              <div className="text-2xl absolute left-10 top-5 font-bold text-[#130D3A] mb-6">
                CertiAI
              </div>

              <div className="mt-20">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 mb-6">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>

                <h2 className="text-2xl font-semibold mb-2 text-[#130D3A]">
                  Password reset
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Your password has been successfully reset. Click below to log
                  in magically.
                </p>

                <div>
                  <button
                    className="w-full text-white py-3 rounded-md bg-[#130D3A]"
                    onClick={() => navigate("/signin")}
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
