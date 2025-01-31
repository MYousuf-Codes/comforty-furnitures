import { FaCheckCircle, FaCreditCard, FaRecycle } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

const MakesDifferent = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-6 bg-white">
      {/* Center Heading */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
        What Makes Our Brand Different
      </h1>

      {/* Branding Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Next Day Delivery */}
        <div className="flex flex-col items-start bg-gray-100 p-6 rounded-lg text-cyan-400 shadow-sm">
          <FaTruckFast className="text-cyan-400 text-3xl sm:text-4xl mb-4" />
          <h2 className="text-lg sm:text-xl mb-2">Next Day as Standard</h2>
          <p className="text-sm sm:text-base">
            Order before 3pm and get your order the next day as standard.
          </p>
        </div>

        {/* Made by True Artisans */}
        <div className="flex flex-col items-start bg-gray-100 p-6 rounded-lg text-cyan-400 shadow-sm">
          <FaCheckCircle className="text-cyan-400 text-3xl sm:text-4xl mb-4" />
          <h2 className="text-lg sm:text-xl mb-2">Made by True Artisans</h2>
          <p className="text-sm sm:text-base">
            Handmade crafted goods made with real passion and craftsmanship.
          </p>
        </div>

        {/* Unbeatable Prices */}
        <div className="flex flex-col items-start bg-gray-100 p-6 rounded-lg text-cyan-400 shadow-sm">
          <FaCreditCard className="text-cyan-400 text-3xl sm:text-4xl mb-4" />
          <h2 className="text-lg sm:text-xl mb-2">Unbeatable Prices</h2>
          <p className="text-sm sm:text-base">
            {`For our materials and quality, you won’t find better prices anywhere.`}
          </p>
        </div>

        {/* Recycled Packaging */}
        <div className="flex flex-col items-start bg-gray-100 p-6 rounded-lg text-cyan-400 shadow-sm">
          <FaRecycle className="text-cyan-400 text-3xl sm:text-4xl mb-4" />
          <h2 className="text-lg sm:text-xl mb-2">Recycled Packaging</h2>
          <p className="text-sm sm:text-base">
            We use 100% recycled materials to ensure our footprint is more manageable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MakesDifferent;
