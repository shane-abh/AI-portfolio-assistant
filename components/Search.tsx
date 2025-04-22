"use client";
import { useEffect, useState } from "react";
import "../app/globals.css";
import { useDebounce } from "@/hooks/useDebounce";
import axios from "axios";
import { useRouter } from "next/navigation";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const debouncedQuery = useDebounce(query, 1000);

  async function fetchSearchResults(searchTerm: string) {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.tiingo.com/tiingo/utilities/search?query=${searchTerm}&token=${process.env.NEXT_PUBLIC_TIINGO_API_KEY}`
      );
     
      setSearchResults(response.data);
    } catch (error: any) {
      setError(error.message || "Error in fetching search results");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSearchResults(debouncedQuery);
  }, [debouncedQuery]);

  const handleSearchResultClick = (ticker: string) => {
    
    router.push(`/stocks/${ticker}`) ;
  };

  return (
    <div>
      
      <div className="flex rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search stock..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
        />
        <button
          type="button"
          className="flex items-center justify-center bg-[#007bff] px-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="fill-white"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </button>
      </div>
      {loading && <p className="text-sm">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="absolute bg-white border w-full">
        {searchResults.map((item: any, index: number) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-100 text-black"
            onClick={() => handleSearchResultClick(item.ticker)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
