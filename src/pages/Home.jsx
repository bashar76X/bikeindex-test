import React, { useEffect, useState } from "react";
import { fetchData } from "../data/fetchData";
import BikeOverview from "../components/home/BikeOverview";
import Pagination from "../components/home/Pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ResultsCount from "../components/home/ResultsCount";
import { DebounceInput } from "react-debounce-input";
import BikeReportSkeleton from "../components/loading/BikeReportSkeleton";

function Home() {
  const [page, setPage] = useState(1);
  const [caseTitle, setCaseTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const PAGE_SIZE = 10;
  const location = "Munich";
  const distance = "100";
  const stolenness = "proximity";

  // Convert date to Unix timestamp
  const toUnixTimestamp = (date) => {
    return date ? Math.floor(new Date(date).getTime() / 1000) : null;
  };

  // Extracting query options for code splitting techs
  function queryOptions(page) {
    const query = caseTitle ? `&query=${encodeURIComponent(caseTitle)}` : "";
    return {
      queryKey: ["stolen-in-munich", { page, caseTitle, caseTitle }],
      queryFn: () =>
        fetchData(
          `search?location=${location}&distance=${distance}&stolenness=${stolenness}&page=${page}&per_page=${PAGE_SIZE}${query}`
        ),
      staleTime: 1000 * 60 * 5,
    };
  }

  // extracting the logic to a custom hook
  function useBikes(page) {
    const queryClient = useQueryClient();

    useEffect(() => {
      queryClient.prefetchQuery(queryOptions(page + 1)); // using prefetch to enhance user experience by fetching the next page in the background
    }, [page, caseTitle, startDate, endDate, queryClient]);

    return useQuery({
      ...queryOptions(page),
      // using placeholder data to prevent layout shifting and for better user experience
      placeholderData: (previousData) => {
        return previousData;
      },
    });
  }

  const { data, isLoading, isPlaceholderData } = useBikes(page);

  // Filter bikes by date range
  const filteredBikes = data?.bikes?.filter((bike) => {
    const bikeDate = bike.date_stolen;
    const startTimestamp = toUnixTimestamp(startDate);
    const endTimestamp = toUnixTimestamp(endDate);
    return (
      (!startTimestamp || bikeDate >= startTimestamp) &&
      (!endTimestamp || bikeDate <= endTimestamp)
    );
  });

  return (
    <div className="container mx-auto my-5 px-4">
      <h1 className="my-5 text-xl font-bold md:text-2xl">
        Bikes stolen in Munich and within 100 miles from Munich
      </h1>
      {/* Filter Inputs */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-x-10">
        {/* Debouncer to reduce server requests */}
        <DebounceInput
          minLength={2}
          debounceTimeout={350}
          type="text"
          placeholder="Case Title"
          value={caseTitle}
          className="focus-visible:outline-0 border-b-[1px] py-2 px-5 border-red-500 w-full md:w-auto"
          onChange={(e) => setCaseTitle(e.target.value)}
        />
        <div className="flex items-center gap-x-5">
          <label htmlFor="start_date">Start Date</label>
          <DebounceInput
            minLength={2}
            debounceTimeout={350}
            type="date"
            name="start_date"
            placeholder="Start Date"
            className="bg-lightGray px-5 py-2 rounded-lg w-full md:w-auto"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-5">
          <label htmlFor="end_date">End Date</label>
          <DebounceInput
            minLength={2}
            debounceTimeout={350}
            type="date"
            placeholder="End Date"
            className="bg-lightGray px-5 py-2 rounded-lg w-full md:w-auto"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      {!startDate && !endDate && caseTitle == "" && (
        <ResultsCount
          location={location}
          distance={distance}
          stolenness={stolenness}
          page={page}
          perPage={PAGE_SIZE}
          query={caseTitle}
        />
      )}
      {isLoading && (
        <div className="space-y-5">
          <BikeReportSkeleton />
          <BikeReportSkeleton />
          <BikeReportSkeleton />
        </div>
      )}
      <div
        className={`${
          isPlaceholderData || (isLoading && "opacity-50 animate-pulse")
        } space-y-5`}
      >
        {filteredBikes?.length == 0 && (
          <div className="mt-10 text-center">Sorry! No results found</div>
        )}
        {filteredBikes?.map((bikeCase, idx) => (
          <BikeOverview key={bikeCase.id} bike={bikeCase} idx={idx} />
        ))}
      </div>
      {filteredBikes?.length !== 0 && (
        <Pagination
          setPage={setPage}
          page={page}
          isPlaceholder={isPlaceholderData}
          page_size={PAGE_SIZE}
          length={filteredBikes?.length}
        />
      )}
    </div>
  );
}

export default Home;
