import React from "react";
import ImageArt from "../../assets/signup_img.png";
import LoaderGif from "../../assets/loader.gif";

const Creating: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full max-w-6xl grid grid-cols-12">
        <div className="col-span-5 sticky top-0 hidden md:block h-screen bg-neutral-900">
          <img
            src={ImageArt}
            alt="art"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-7 bg-white flex flex-col">
          <div className="p-12">
            <div className="text-2xl font-bold text-[#130D3A]">CertiAI</div>
          </div>

          <div className=" flex items-center justify-center">
            <div className="text-center md:mt-[-100px]">
              <img
                src={LoaderGif}
                alt="loading"
                className="mx-auto h-100"
              />
              <h3 className="text-2xl heading md:mt-[-50px] font-semibold text-[#130D3A] mb-2">
                Getting things ready for you...
              </h3>
              <p className="text-sm text-gray-400">
                This may take a few minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creating;
