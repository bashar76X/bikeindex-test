import React from "react";
import { NavLink } from "react-router";

// extracted to function to use in the other page
export const timeConverter = (utc_date) => {
  const timestamp = utc_date;
  const date = new Date(timestamp * 1000);

  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  return formattedDate;
};

function BikeOverview({ bike, idx }) {
  const formattedDate = timeConverter(bike?.date_stolen);

  return (
    <div
      className={`grid grid-cols-1 gap-y-4 md:grid-cols-12 md:gap-x-2 h-full ${
        idx % 2 === 0 ? "bg-lightGray" : "bg-white"
      }`}
    >
      <div className="col-span-1 md:col-span-2 row-span-2 bg-lightGray h-[14rem] md:h-auto">
        <img
          className="w-full h-full object-cover"
          src={
            bike?.large_img ||
            "https://bikeindex.org/assets/revised/bike_photo_placeholder-ff15adbd9bf89e10bf3cd2cd6c4e85e5d1056e50463ae722822493624db72e56.svg"
          }
          alt="bike image"
        />
      </div>

      <div className="col-span-1 md:col-span-4 space-y-2 p-3 md:p-5">
        <NavLink className="text-[#3498db]" to={`/bike/${bike?.id}`}>
          <span className="font-bold">{bike?.title}</span>
        </NavLink>
        <p>
          <span className="text-secondaryText font-bold">Serial: </span>
          <span>{bike?.serial}</span>
        </p>
        <p>
          <span className="text-secondaryText font-bold">Primary colors: </span>
          {bike?.frame_colors?.map((color, idx) => (
            <span key={idx}>
              {color}
              {idx < bike.frame_colors.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>

      <div className="col-span-1 md:col-span-4 space-y-2 p-3 md:p-5">
        <p>
          <span className="text-red-600 font-bold">STOLEN: </span>
          <span>{formattedDate}</span>
        </p>
        <p>
          <span className="text-secondaryText font-bold">Location: </span>
          <span>{bike?.stolen_location}</span>
        </p>
      </div>
    </div>
  );
}

export default BikeOverview;
