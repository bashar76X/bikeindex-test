import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://bikeindex.org:443/api/v3/",
  // baseURL: "https://sdeira.glmaagencyprojects.com/api/",
});

instance.interceptors.request.use(function (config) {
  config.headers.Accept = "application/json";
  return config;
});

export const fetchData = async (url) => {
  try {
    const response = await instance({
      url: url,
      method: "GET",
    });
    return response.data;
  } catch (e) {
    console.log(e.message);
    throw new Error(`Failed to fetch: ${e.message}`);
  }
};

export default function useFetchByQuery(url, key) {
  return useQuery({
    queryKey: key,
    queryFn: () => fetchData(url),
    staleTime: 1000 * 60 * 1000,
    refetchOnWindowFocus: false,
    throwOnError: true,
  });
}
