import React from "react";
import { useSelector } from "react-redux";
import lang, {
  gptSearchPlaceholder,
  search,
} from "../utils/languageConstaints";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  console.log(langKey);
  // console.log(lang[langKey].search);

  return (
    <div className=" flex justify-center pt-[20%] ">
      <form className="w-1/2 bg-black grid grid-cols-12 items-center">
        <input
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg"
          placeholder={lang[langKey]?.gptSearchPlaceholder}
        />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
