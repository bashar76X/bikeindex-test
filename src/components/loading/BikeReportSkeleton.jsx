import React from "react";

const BikeReportSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg shadow animate-pulse">

      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
     
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
     
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
};

export default BikeReportSkeleton;
