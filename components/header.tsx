"use client";

import Image from "next/image";
import { useState } from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [showSearchFilter, setShowSearchFilter] = useState(true);

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
          } fixed z-10 top-0 left-0 bg-white px-4 py-4 w-full`}
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
                  />
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
