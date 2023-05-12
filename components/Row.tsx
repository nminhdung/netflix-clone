import { Movie } from "@/typings";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useRef, useState } from "react";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      console.log(scrollLeft, clientWidth);
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      console.log(scrollTo);
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-2 md:space-y-4">
      <h2
        className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5]
       transition duration-200 hover:text-white md:text-2xl"
      >
        {title}
      </h2>
      <div className="group relative">
        <ChevronLeftIcon
          onClick={() => handleClick("left")}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 cursor-pointer 
          opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
        />
        <div
          ref={rowRef}
          className="flex scrollbar-hide items-center gap-x-0.5 overflow-x-scroll md:gap-x-2"
        >
          {movies.map((movie) => {
            return <Thumbnail key={movie.id} movie={movie} />;
          })}
        </div>
        <ChevronRightIcon
          onClick={() => handleClick("right")}
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 cursor-pointer 
          opacity-0 transition hover:scale-125 group-hover:opacity-100 `}
        />
      </div>
    </div>
  );
};

export default Row;
