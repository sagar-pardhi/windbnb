"use client";

import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

import { useAppContext } from "@/providers/context-provider";
import { Stays } from "@/types";

export const Header = () => {
  const { staysData, setFilteredData } = useAppContext();

  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [showLocationSuggestion, setShowLocationSuggestion] = useState(false);
  const [showGuestsOptions, setShowGuestsOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [locationData, setLocationData] = useState<Stays[]>(staysData);
  // const [filteredData, setFilteredData] = useState<Stays[]>([]);
  const [noOfGuests, setNoOfGuests] = useState(0);
  const [noOfAdults, setNoOfAdults] = useState(0);
  const [noOfChildrens, setNoOfChildrens] = useState(0);

  function handleLocationSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setShowLocationSuggestion(true);

    const filtered = staysData
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

    setLocationData(filtered);
  }

  async function handleSubmit() {
    const [city, country] = searchTerm?.split(",") ?? [];

    const filterData = {
      city: city,
      country: country,
      no_of_guests: "" + noOfGuests,
    };

    const searchParams = new URLSearchParams(filterData);

    try {
      const response = await fetch(`/api/stays?${searchParams.toString()}`, {
        method: "GET",
      });
      const data = await response.json();
      setFilteredData(data);
      setShowSearchFilter(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="flex flex-col md:flex-row md:justify-between gap-y-10">
      <Image
        src="/assets/logo.svg"
        width={100}
        height={100}
        alt="logo"
        className="object-fit cursor-pointer"
        onClick={() => setFilteredData(staysData)}
      />
      <div className="flex items-center">
        {/* Search Filter */}
        <div
          className={`${
            showSearchFilter ? "block" : "hidden"
          } fixed z-50 top-0 left-0 bg-white px-4 py-4 md:px-8 md:py-8 lg:px-16 lg:py-8 w-full`}
        >
          <div className="flex flex-col">
            <div className="flex justify-between mb-3">
              <h3 className="text-sm font-bold">Edit your search</h3>
              <button onClick={() => setShowSearchFilter(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-y-5 md:flex-row md:justify-between">
              <div className="border p-2 gap-y-2 rounded-xl flex flex-col md:w-full shadow-sm md:mr-5 md:flex-row">
                <div className="flex flex-col w-full">
                  <label className="px-2 text-xs font-bold">Location</label>
                  <input
                    className="w-full px-2 appearance-none outline-none text-sm relative"
                    type="text"
                    onChange={(event) => handleLocationSearch(event)}
                    value={searchTerm!}
                  />

                  {showLocationSuggestion && (
                    <div className="overflow-auto h-[100px] md:h-fit">
                      {locationData &&
                        locationData.map((item, index) => (
                          <div
                            key={index}
                            className="flex px-2 py-3 cursor-pointer"
                          >
                            <div className="flex items-center gap-x-3">
                              <MapPinIcon className="w-4 h-4" />
                              <p
                                className="text-sm "
                                onClick={(e) => {
                                  setSearchTerm(e.currentTarget.textContent);
                                  setShowLocationSuggestion(false);
                                }}
                              >
                                {item.city}, Finland
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col w-full">
                  <label className="px-2 text-xs font-bold">Guests</label>
                  <input
                    className="w-full px-2 appearance-none outline-none text-sm"
                    type="number"
                    placeholder="Add Guests"
                    value={noOfGuests || noOfAdults + noOfChildrens}
                    onChange={(e) => {
                      setNoOfGuests(+e.target.value);
                      setShowGuestsOptions(true);
                    }}
                  />

                  {showGuestsOptions && (
                    <>
                      <div className="flex flex-col my-2 px-2 w-full lg:w-1/2">
                        <div>
                          <h4 className="text-md text-[#333333] font-bold">
                            Adults
                          </h4>
                          <h5 className="text-sm text-[#c1c1c1]">
                            Ages 13 or above
                          </h5>
                          <div className="flex my-2 justify-between">
                            <button
                              className="border-[#828282] border rounded-md w-7 h-7 items-center"
                              onClick={() => setNoOfAdults((curr) => curr - 1)}
                              disabled={noOfAdults <= 0}
                            >
                              -
                            </button>
                            <span>{noOfAdults}</span>
                            <button
                              className="border-[#828282] border rounded-md w-7 h-7 items-center"
                              onClick={() => setNoOfAdults((curr) => curr + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col my-2 px-2 w-full lg:w-1/2">
                        <div>
                          <h4 className="text-md text-[#333333] font-bold">
                            Children
                          </h4>
                          <h5 className="text-sm text-[#c1c1c1]">
                            Ages 2 - 12
                          </h5>
                          <div className="flex my-2 justify-between">
                            <button
                              className="border-[#828282] border rounded-md w-7 h-7 items-center"
                              onClick={() =>
                                setNoOfChildrens((curr) => curr - 1)
                              }
                              disabled={noOfChildrens <= 0}
                            >
                              -
                            </button>
                            <span>{noOfChildrens}</span>
                            <button
                              className="border-[#828282] border rounded-md w-7 h-7 items-center"
                              onClick={() =>
                                setNoOfChildrens((curr) => curr + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  className="bg-[#ea6565] rounded-xl px-4 py-2 text-white flex gap-x-3"
                  onClick={handleSubmit}
                >
                  <MagnifyingGlassIcon className="w-6 h-6" />
                  Search
                </button>
              </div>
            </div>

            {/* Show filter suggestions */}
          </div>
        </div>
        {/* Search Filter */}

        <div className="flex border-2 rounded-xl ">
          <input
            className="w-[50%] p-2 appearance-none rounded-l-xl outline-none border-r-2 text-center text-sm"
            type="text"
            placeholder="Helsinki, Finland"
            onClick={() => setShowSearchFilter(true)}
          />
          <input
            className="w-[50%] p-2 appearance-none outline-none border-r-2 text-center text-sm"
            type="text"
            placeholder="Add guests"
            onClick={() => setShowSearchFilter(true)}
          />
          <button className="px-2" onClick={() => setShowSearchFilter(true)}>
            <MagnifyingGlassIcon className="w-6 h-6 text-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
