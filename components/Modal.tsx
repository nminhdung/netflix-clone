import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";

import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/solid";
import { Movie, rootState } from "@/typings";
import { modalState, movieState } from "@/atoms/modalAtom";
import { useRecoilState } from "recoil";
import { Element, Genre } from "@/typings";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";

const Modal = () => {
  const [movie, setMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);
  console.log(movie)
  useEffect(() => {
    if (!movie) return;
    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const movieTrailer = data.videos.results.find(
          (element: Element) => element.type === "Trailer"
        );
        // setTrailer(data.videos?.results[index]?.key);  
        setTrailer(movieTrailer?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    };
    fetchMovie();
  }, [movie]);

  console.log(trailer, genres);

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0  z-50 w-full max-w-5xl mx-auto
      overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modal-button absolute right-5 top-5 !z-40 h-9 w-9 border-none
          bg-[#181818] "
        >
          <XIcon className="w-6 h-6" />
        </button>
        <div className="relative pt-[56%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            muted={muted}
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
          />
          <div className="absolute bottom-10 flex items-center justify-between px-10 w-full">
            <div className="flex gap-x-2">
              <button
                className="flex items-center gap-x-2 rounded bg-white text-black px-8 
               text-xl font-bold transition hover:bg-[#e6e6e6]"
              >
                <FaPlay className="w-7 h-7 text-black" />
                Play
              </button>
              <button className="modal-button">
                <PlusIcon className="w-7 h-7" />
              </button>
              <button className="modal-button">
                <ThumbUpIcon className="w-7 h-7" />
              </button>
            </div>
            <button onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="w-6 h-6" />
              ) : (
                <VolumeUpIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 justify-center items-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-y-4 gap-x-10 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col gap-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original languages: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
