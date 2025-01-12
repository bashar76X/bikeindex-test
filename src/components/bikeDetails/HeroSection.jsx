import { timeConverter } from "../home/BikeOverview";

const HeroSection = ({ bike }) => {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center px-4 py-8">
        <img
          src={bike?.large_img}
          alt={bike?.title}
          className="w-full lg:w-1/2 rounded-lg object-cover"
        />

        <div className="lg:ml-8 mt-6 lg:mt-0 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-800">{bike?.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{bike?.title}</p>
          <p className="mt-4 text-sm text-gray-500">
            Stolen Location: {bike?.stolen_location}
          </p>
          <p className="text-sm text-gray-500">
            Stolen Date: {timeConverter(bike?.date_stolen)}
          </p>
          <p className="mt-4 text-sm font-semibold text-red-600 uppercase">
            Status: {bike?.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
