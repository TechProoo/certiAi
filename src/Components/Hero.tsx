import { Link } from "react-router-dom";
import Image from "../assets/hero_img.png";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <div className="hero_cover">
      <Navbar />
      <div className="w-10/12 m-auto grid md:grid-cols-2 grid-cols-1 items-center">
        <div className="hero_left">
          <h1 className=" leading-tight">
            Verify Educational Certificates Instantly with AI.
          </h1>
          <p className="mt-5 heading">
            Upload certificates, detect forgery, and verify academic credentials
            securely in seconds.
          </p>
          <Link to={"signup"} className="mt-5">
            Get Started
          </Link>
        </div>
        <div className="hero_right">
          <div className="hero_img">
            <img src={Image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
