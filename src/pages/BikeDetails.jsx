import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { fetchData } from "../data/fetchData";
import { timeConverter } from "../components/home/BikeOverview";
import HeroSection from "../components/bikeDetails/HeroSection";
import Tabs from "../components/bikeDetails/TabsComponent";

function BikeDetails() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bike", { id }],
    queryFn: () => fetchData(`bikes/${id}`),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <div className="size-full grid place-items-center">Loading ...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <NavLink to={`/`} className={`bg-lightGray px-5 py-2 rounded mb-2`}>
        Go back
      </NavLink>
      <div className="bg-gray-50 min-h-screen">
        <HeroSection bike={data?.bike} />

        <div className="max-w-6xl mx-auto px-4 py-8">
          <Tabs bike={data?.bike} />
        </div>
      </div>
    </div>
  );
}

export default BikeDetails;
