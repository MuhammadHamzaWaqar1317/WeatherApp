import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faLocationArrow,
  faMagnifyingGlassLocation,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getCityData, locationWeather } from "../Redux/Thunks/cityDataApi";
import { constant } from "../constant/constant";
import { Row, Col, Button } from "antd";
function Header() {
  const dispatch = useDispatch();
  const tempUnit = useSelector((state) => state.weatherDataSlice.tempUnit);
  const [search, setSearch] = useState("");
  console.log(search);

  const handleSearch = () => {
    if (search.trim() == "") {
      return;
    }
    dispatch(
      getCityData({
        city: search,
        unit:
          tempUnit == constant.celciusSymbol
            ? constant.celciusUnit
            : constant.fahrenheitUnit,
      })
    );
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      dispatch(
        locationWeather({
          lat,
          lon: lng,
          unit:
            (tempUnit == tempUnit) == constant.celciusSymbol
              ? constant.celciusUnit
              : constant.fahrenheitUnit,
        })
      );
    });
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-2">
        <h1 className=" text-left font-bold text-4xl   lg:col-span-6 md:col-span-7 sm:col-span-6 col-span-12">
          Weather Dashboard
        </h1>
        <div className="col-span-9 lg:col-span-5 md:col-span-4 sm:col-span-5 content-center search-div">
          <form class="max-w-md mx-auto">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>

            <div class="relative ">
              <Button
                onClick={handleLocation}
                type="primary"
                style={{ borderRadius: "5px 0 0 5px" }}
                className="hover:bg-blue-950 absolute inset-y-0 start-0 flex items-center ml-[2px] ps-3 btn-primary dark:bg-gray-800"
              >
                <FontAwesomeIcon
                  icon={faLocationArrow}
                  className="dark:text-white"
                />
              </Button>
              <input
                type="search"
                id="default-search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderRadius: "5px" }}
                class="block w-full ml-[2px] mr-3 p-[5px] ps-12 pe-12 text-sm text-gray-900 border  border-blue-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"
                placeholder="Search City..."
                required
              />
              <Button
                onClick={handleSearch}
                type="primary"
                style={{ borderRadius: "0px 5px 5px 0px" }}
                className="hover:bg-blue-950 absolute inset-y-0 end-0 flex items-center me-[-2px] pe-3 btn-primary dark:bg-gray-800"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlassLocation}
                  className="dark:text-white"
                />
              </Button>
            </div>
          </form>
        </div>

        <div className="col-span-1 ml-2 mt-1 content-center toggle ">
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              name="checkbox"
              class="sr-only peer"
              onChange={(e) => document.body.classList.toggle("dark")}
            />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </>
  );
}

export default Header;
