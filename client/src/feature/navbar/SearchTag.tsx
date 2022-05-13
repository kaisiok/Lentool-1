import { useState } from "react";
import { useAppDispatch } from "app/hooks";
import { useSearchByTagMutation, useSearchMutation } from "services/api";
import { getSearch, getSearchTitle } from "./searchSlice";
import { Link, useHistory } from "react-router-dom";

const src = [
  ["https://cdn-icons-png.flaticon.com/512/620/620471.png", "hammer"],
  ["https://cdn-icons-png.flaticon.com/512/620/620492.png", "wagon"],
  ["https://cdn-icons-png.flaticon.com/512/620/620495.png", "monkey_spanne"],
  ["https://cdn-icons-png.flaticon.com/512/2270/2270932.png", "hexagon_wrench"],
  ["https://cdn-icons-png.flaticon.com/128/2270/2270944.png", "tape_measure"],
  ["https://cdn-icons-png.flaticon.com/512/620/620493.png", "nipper"],
  ["https://cdn-icons-png.flaticon.com/512/620/620482.png", "saw"],
  ["https://cdn-icons-png.flaticon.com/512/620/620466.png", "drill"],
  ["https://cdn-icons-png.flaticon.com/512/620/620485.png", "shovel"],
  ["https://cdn-icons-png.flaticon.com/512/3126/3126268.png", "soldering_iron"],
  ["https://cdn-icons-png.flaticon.com/128/2270/2270948.png", "long_nose"],
  ['https://cdn-icons-png.flaticon.com/512/570/570223.png', "etc",],
];
export default function SearchTag() {
  const { push } = useHistory();
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const [isTag, setIsTag] = useState("hidden");

  const [result] = useSearchMutation();
  const [result2] = useSearchByTagMutation();
  const handleSearch = (e: any) => {
    setInputValue(e.target.value);
  };
  const onTag = (e: any) => {
    setIsTag(e);
  };
  const onEnter = (e: any) => {
    if (e.key === 'Enter') searchPost()
  }
  const searchPost = async () => {
    const title = await result(inputValue);
    dispatch(getSearch(title));
    push(`/search?title=${inputValue}`);
    const clearInput = async () => {
      setInputValue("");
    };
    await clearInput();
  };

  const searchByTag = async (tag: string) => {
    const tagResult = await result2(tag);
    dispatch(getSearchTitle(tagResult));
    setIsTag("hidden");
  };

  return (
    <div className="relative bg-white">
      <div className="space-x-10">
        <div className="text-gray-600 sm:w-80 md:w-64 lg:w-80">
          <input
            name="search"
            placeholder="Search"
            onChange={(e) => handleSearch(e)}
            onFocus={() => onTag("visible")}
            onBlur={() => onTag("hidden")}
            onKeyPress={onEnter}
            value={inputValue}
            autoComplete="off"
            className="pt-2 pb-2 border focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
          />
          <button
            type="submit"
            onClick={searchPost}
            className="absolute right-0 top-0 mt-3 mr-4"
            >
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              xmlSpace="preserve"
              width="512px"
              height="512px"
              >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
          <div
            className={`${isTag} absolute z-50 -ml-4 mt-3 transform px-2 w-screen max-w-sm sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2`}
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 py-5 bg-gray-50 space-y-6 sm:space-y-0 sm:space-x-10 sm:px-8">
                <div className="grid grid-cols-4 gap-4 justify-items-center">
                  {src.map((el, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/search?tag=${el[1]}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => searchByTag(el[1])}
                      >
                        <img
                          className="w-10 h-10 hover:shadow hover:border hover:rounded-lg"
                          src={el[0]}
                          alt={el[1]}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
