import { FaArrowRightLong } from "react-icons/fa6";
import img1 from "../../assets/images/about/img1.jpg";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 my-12">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Left Section - Image */}
        <section className="w-full lg:w-1/2">
          <div className="relative">
            <img className="rounded-md w-full" src={img1} alt="product" />
          </div>
        </section>

        {/* Right Section - Text */}
        <section className="w-full lg:w-1/2 pt-4 text-justify">
          <h3 className="text-xl text-[#FF3811] font-semibold">--- About Us</h3>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark1 titleFont py-4">
            Empowering Buyers & Sellers in One Platform
          </h1>

          <p className="font-medium my-2">
  <span className="titleFont text-[#FF3811] font-bold">
    SHOPSPHERE
  </span>{" "}
  is your trusted online marketplace for smart and secure shopping.
  Discover a wide range of quality products from verified sellers
  across the country — from tech gadgets to fashion trends and daily
  essentials.
</p>

<p className="font-medium">
  We connect buyers and sellers in a reliable ecosystem, ensuring
  seamless transactions, secure payments, and customer-first support.
  Shop smart. Sell easy. Grow together — only at ShopSphere.
</p>


          <button className="rounded flex items-center gap-2 hover:bg-[#ed4321] mt-8 sm:mt-10 bg-[#FF3811] text-sm font-bold titleFont px-4 py-2 text-white transition-all duration-300">
            See Products <FaArrowRightLong />
          </button>
        </section>
      </div>
    </div>
  );
};

export default About;
