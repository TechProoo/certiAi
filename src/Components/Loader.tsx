import LoaderGif from "../assets/loader.gif";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-black/80">
      <img src={LoaderGif} alt="loading" className="w-20 h-20" />
    </div>
  );
};

export default Loader;
