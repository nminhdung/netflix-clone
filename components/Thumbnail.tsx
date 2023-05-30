import React from "react";
import { Movie, rootState } from "@/typings";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMovie, setShowModal } from "../redux/Modal/modalSlice";
interface Props {
  movie: Movie;
  //whent using firebase
  //movie: Movie || DocumentData;
}
const Thumbnail = ({ movie }: Props) => {

  const dispatch = useDispatch();
  const currentMovie = useSelector(
    (state: rootState) => state.modal.movieCurrent
  );
  const showModal = useSelector((state: rootState) => state.modal.showModal);
  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 
    ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        dispatch(setCurrentMovie(movie));
        dispatch(setShowModal(true));
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        fill
        alt="thumbnail"
      />
    </div>
  );
};

export default Thumbnail;
