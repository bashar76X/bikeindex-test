import React from "react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Pagination({ page, setPage, isPlaceholder, page_size, length }) {
  const handlePrevious = () => {
    setPage((page) => page - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    setPage((page) => page + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center justify-center gap-x-5 my-10">
      <button
        disabled={isPlaceholder || page == 1} // disabling the button when the placeholder data is shown or when the user in the first page
        onClick={handlePrevious}
        className="bg-slate-200 px-5 rounded-full cursor-pointer disabled:cursor-not-allowed py-2 disabled:opacity-50"
      >
        <IoIosArrowBack size={20} />
      </button>
      <p className="rounded-full border size-10 flex items-center justify-center border-gray-400">
        {" "}
        {page}
      </p>
      <button
        disabled={isPlaceholder || length < page_size} // disabling the button when the placeholder data is shown or when the user reaches the last page
        onClick={handleNext}
        className="bg-slate-200 cursor-pointer px-5 py-2 rounded-full disabled:cursor-not-allowed disabled:bg-opacity-50"
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
}

export default Pagination;
