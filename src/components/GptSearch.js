import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BG_IMAGE } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-20 ">
        <img src={BG_IMAGE} alt="bg-image" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptSearch;
