import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchData } from "../../data/fetchData";

function ResultsCount({
  page,
  perPage,
  location,
  distance,
  stolenness,
  query,
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["tota_count", query],
    queryFn: () =>
      fetchData(
        `search/count?location=${location}&distance=${distance}&stolenness=${stolenness}&query=${query}`
      ),
    staleTime: 1000 * 60 * 5,
  });

  const totalCount = data?.proximity;
  const calculateResultsRange = (page, perPage, totalCount) => {
    const from = (page - 1) * perPage + 1;
    const to = Math.min(page * perPage, totalCount);
    return { from, to };
  };

  const { from, to } = calculateResultsRange(page, perPage, totalCount);

  return (
    <div className="w-full py-5">
      {isLoading && <p className="font-bold">Loading...</p>}
      {!isLoading && (
        <p className="">
          Showing results <span className="font-bold">{from}</span> to{" "}
          <span className="font-bold"> {to}</span> of{" "}
          <span className="font-bold"> {totalCount}</span>
        </p>
      )}
    </div>
  );
}

export default ResultsCount;
