import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";

import { XIcon } from "@heroicons/react/solid";
import { Movie, rootState } from "@/typings";
import { modalState } from "@/atoms/modalAtom";
import { useRecoilState } from "recoil";

const Modal = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);

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
    };
  }, []);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        <button
          onClick={handleClose}
          className="modal-button absolute right-5 top-5 !z-40 h-9 w-9 border-none
          bg-[#181818] "
        >
          <XIcon className="w-6 h-6" />
        </button>
        <div></div>
      </>
    </MuiModal>
  );
};

export default Modal;
