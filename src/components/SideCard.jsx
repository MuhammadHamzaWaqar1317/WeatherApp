import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { multipleCityData } from "../Redux/Thunks/cityDataApi";
import { changeCityData } from "../Redux/Slices/weatherDataSlice";
import { constant } from "../constant/constant";
function SideCard() {
  const dispatch = useDispatch();
  const cityData = useSelector((state) => state.weatherDataSlice.multipleCity);

  const tempUnit = useSelector((state) => state.weatherDataSlice.tempUnit);
  useEffect(() => {
    dispatch(multipleCityData({ unit: constant.celciusUnit }));
  }, []);
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  function CityData({ data, tempUnit, index }) {
    const [hoverActive, setHoverActive] = useState(false);
    const { name, sys, iconSrc, main, weather } = data;
    return (
      <>
        <div
          onMouseEnter={() => setHoverActive(true)}
          onMouseLeave={() => setHoverActive(false)}
          className={`hover:bg-sky-100   dark:hover:bg-slate-600 ${
            index != 4 ? `border-b` : ``
          }`}
          onClick={() => {
            dispatch(changeCityData(data));
            ScrollToTop();
          }}
        >
          <div className="grid grid-cols-12 items-center box-border px-4">
            <div className="col-span-4">
              <h4 className="text-left font-bold">{name}</h4>
              <p>{sys.country}</p>
            </div>
            <div
              className={`${
                hoverActive ? `scale-125` : ``
              } col-span-4 content-end text-center flex justify-center items-center`}
            >
              <img
                src={iconSrc}
                width={"85px"}
                alt=""
                className="weather-icon col-span-4"
              />
            </div>

            <div className="col-span-4">
              <h4 className="text-right font-bold">
                {main.temp}°{tempUnit}
              </h4>
              <p className="text-right">{weather[0].description}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        id="card-shadow"
        className="xl:col-span-3 lg:col-span-12 md:col-span-12 col-span-12 mt-8 xl:ml-7 rounded-lg bg-white dark:bg-gray-800 h-auto "
      >
        <h1 className="text-left text-xl pl-4 mt-3 mb-3">
          Forecast in Other <span className="font-bold">Cities</span>
        </h1>
        <hr />
        {cityData?.map((item, index) => (
          <CityData data={item} tempUnit={tempUnit} index={index} />
        ))}
      </div>
    </>
  );
}

export default SideCard;
