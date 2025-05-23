import { CiShoppingTag } from "react-icons/ci";
import { Link } from "react-router";

const BannerText: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-black/95 to-black/5 h-auto py-36">
      <div className="w-full md:w-2/3 lg:w-1/2 pr-6 md:pr-0 pl-6 md:pl-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Your Trusted Online Marketplace
        </h1>
        <p className="text-justify text-white py-8 font-medium">
          Discover a wide range of high-quality products at the best prices. Shop with confidence and enjoy seamless online shopping from the comfort of your home!
        </p>
      </div>
      <div className="pr-6 md:pr-0 pl-6 md:pl-16">
        <Link to="/all-product"><button className="border rounded hover:bg-[#FF3811] hover:border-[#FF3811] text-sm font-bold border-white px-3 py-2 text-white flex gap-2 items-center">
        <CiShoppingTag className="text-2xl" /> Shop Now
        </button></Link>
      </div>
    </div>
  );
};

export default BannerText;
