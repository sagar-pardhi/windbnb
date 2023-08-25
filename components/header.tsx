"use client";

import { Stays } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Header = () => {
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [suggestions, setSuggestions] = useState<Stays[]>([]);
  const [filteredData, setFilteredData] = useState<Stays[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/stays");
      const data = await response.json();
      setSuggestions(data);
    }

    getData();
  }, []);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filtered = suggestions
      .filter(
        (data, index, array) =>
          array.findIndex(
            (d) => d.city == data.city && d.country == data.country
          ) == index
      )
      .filter(
        (cityData) =>
          cityData.city.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
          cityData.country.toLowerCase().startsWith(searchTerm.toLowerCase())
      );

    setFilteredData(filtered);
  }

  return (
    <header className="flex flex-col md:flex-row md:justify-between gap-y-10">
      <Image
        src="/assets/logo.svg"
        width={100}
        height={100}
        alt="logo"
        className="object-fit"
      />
      <div className="flex items-center">
        {/* Search Filter */}
        <div
          className={`${
            showSearchFilter ? "block" : "hidden"
          } fixed z-10 top-0 left-0 bg-white px-4 py-4 md:px-8 md:py-8 lg:px-16 lg:py-8 w-full overflow-auto`}
        >
          <div className="flex flex-col">
            <div className="flex justify-between mb-3">
              <h3 className="text-sm font-bold">Edit your search</h3>
              <button onClick={() => setShowSearchFilter(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-y-5 md:flex-row md:justify-between">
              <div className="border p-2 gap-y-2 rounded-xl flex flex-col md:w-full shadow-sm md:mr-5 md:flex-row">
                <div className="flex flex-col w-full">
                  <label className="px-2 text-xs font-bold">Location</label>
                  <input
                    className="w-full px-2 appearance-none outline-none text-sm relative"
                    type="text"
                    defaultValue="Helsinki, Finland"
                    onChange={(event) => handleSearch(event)}
                    value={searchTerm!}
                  />

                  {filteredData &&
                    filteredData.map((item, index) => (
                      <div
                        key={index}
                        className="flex px-2 py-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                          </svg>

                          <p
                            className="text-sm "
                            onClick={(e) =>
                              setSearchTerm(e.currentTarget.textContent)
                            }
                          >
                            {item.city}, Finland
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex flex-col w-full">
                  <label className="px-2 text-xs font-bold">Guests</label>
                  <input
                    className="w-full px-2 appearance-none outline-none text-sm"
                    type="text"
                    placeholder="Add Guests"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button className="bg-[#ea6565] rounded-xl px-4 py-2 text-white flex gap-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  Search
                </button>
              </div>
            </div>

            {/* Show filter suggestions */}
          </div>
        </div>
        {/* Search Filter */}

        <div className="flex border rounded-xl shadow-md">
          <input
            className="w-[50%] p-2 appearance-none outline-none border-r-2 text-center text-sm"
            type="text"
            defaultValue="Helsinki, Finland"
            onClick={() => setShowSearchFilter(true)}
          />
          <input
            className="w-[50%] p-2 appearance-none outline-none border-r-2 text-center text-sm"
            type="text"
            placeholder="Add guests"
            onClick={() => setShowSearchFilter(true)}
          />
          <button className="px-2" onClick={() => setShowSearchFilter(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
