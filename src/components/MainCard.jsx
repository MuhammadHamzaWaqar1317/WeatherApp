import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faDroplet,
  faWind,
  faWater,
  faCloud,
  faSun,
  faMoon,
  faUmbrella,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import { constant } from "../constant/constant";
import { useSelector, useDispatch } from "react-redux";
import { changeTemp } from "../Redux/Slices/weatherDataSlice";
import { getCityData, multipleCityData } from "../Redux/Thunks/cityDataApi";

function FirstCard({
  city,
  temp,
  high,
  low,
  feelsLike,
  iconSrc,
  description,
  suggestion,
  tempUnit,
}) {
  const [switchTemp, setSwitchTemp] = useState("F");
  const dispatch = useDispatch();

  const tempObj = {
    F: "C",
    C: "F",
  };

  const handleTempChange = () => {
    setSwitchTemp((prev) => tempObj[prev]);
    dispatch(changeTemp(switchTemp));
    dispatch(
      getCityData({
        city: city,
        unit:
          switchTemp == constant.fahrenheitSymbol
            ? constant.fahrenheitUnit
            : constant.celciusUnit,
      })
    );

    dispatch(
      multipleCityData({
        unit:
          switchTemp == constant.fahrenheitSymbol
            ? constant.fahrenheitUnit
            : constant.celciusUnit,
      })
    );
  };

  return (
    <>
      <div
        id="internal-card-shadow"
        className="bg-cyan-200 dark:bg-gray-900 rounded-lg px-5 py-3 h-52 flex flex-col gap-5  max-xl:flex-grow lg:flex-grow md:flex-grow sm:basis-full  md:basis-full lg:basis-auto xl:basis-auto "
      >
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold ">
            {temp}°{tempUnit}{" "}
            <span className="text-xs align-super">
              /{" "}
              <button onClick={handleTempChange} className="celcius-btn">
                {switchTemp}
              </button>{" "}
            </span>
          </h1>

          <div className="">
            <h5>
              High
              <span className="text-xl">
                {high}°{tempUnit}
              </span>{" "}
            </h5>
            <h5>
              Low
              <span className="text-xl">
                {low}°{tempUnit}
              </span>
            </h5>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="">
            <p>{description}</p>
            <p>
              Feels like {feelsLike}°{tempUnit}
            </p>
            <div>
              {suggestion == "Clouds" ? (
                <>
                  <FontAwesomeIcon
                    icon={faUmbrella}
                    className="dark:text-white"
                  />

                  <span className="pl-1">Umbrella Required</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="dark:text-white"
                  />

                  <span className="pl-1">Ideal Conditions</span>
                </>
              )}
            </div>
          </div>
          <img src={iconSrc} width={"85px"} alt="" className="weather-icon" />{" "}
          {/* Add Icon Here */}
        </div>
      </div>
    </>
  );
}

function SecondCard({ visibility, wind, humidity, cloudliness, tempUnit }) {
  const Data = ({ text, temp, Icon, hrRender = true }) => {
    return (
      <>
        <div className="flex justify-between items-center  px-3 h-10">
          <h1 className="text-lg font-bold ">{text}</h1>
          <div className="flex">
            <p className="mr-2">{temp}</p>
            <FontAwesomeIcon
              icon={Icon}
              className="pt-1 text-green-900 dark:text-white"
            />
          </div>
        </div>
        {hrRender && <hr />}
      </>
    );
  };

  return (
    <>
      <div
        id="internal-card-shadow"
        className="bg-green-100 dark:bg-gray-400  rounded-lg max-xl:flex-grow lg:flex-grow md:flex-grow sm:basis-auto  md:basis-auto lg:basis-auto xl:basis-auto basis-full"
      >
        <Data text="Visibility" temp={`${visibility}km`} Icon={faEyeSlash} />
        <Data text="Dew Point" temp={`°${tempUnit}`} Icon={faDroplet} />
        <Data text="Wind" temp={`${wind}mph`} Icon={faWind} />
        <Data text="Humidity" temp={`${humidity}%`} Icon={faWater} />
        <Data
          text="Cloudiness"
          temp={`${cloudliness}%`}
          Icon={faCloud}
          hrRender={false}
        />
      </div>
    </>
  );
}

function ThirdCard({ sunrise, sunset }) {
  return (
    <>
      <div
        id="internal-card-shadow"
        className="   rounded-lg pt-2 background-img max-xl:flex-grow lg:flex-grow md:flex-grow "
      >
        <h3 className="text-center">
          <FontAwesomeIcon
            icon={faSun}
            className="pt-1 text-gray-500 dark:text-white"
          />
        </h3>
        <h3 className="text-center text-lg pt-2">Sunrise</h3>
        <h3 className="text-center text-xl">{sunrise}</h3>
        {/* GAP HERE */}
        <h3 className="text-center">
          <FontAwesomeIcon
            icon={faMoon}
            className="pt-4 text-gray-500 dark:text-white"
          />
        </h3>
        <h3 className="text-center text-lg pt-1">Sunset</h3>
        <h3 className="text-center text-xl">{sunset}</h3>
      </div>
    </>
  );
}

function MainCard() {
  const cityData = useSelector((state) => state.weatherDataSlice.cityData);
  const tempUnit = useSelector((state) => state.weatherDataSlice.tempUnit);
  const dispatch = useDispatch();
  console.log(cityData, "cityData");

  useEffect(() => {
    dispatch(getCityData({ city: "rawalpindi", unit: constant.celciusUnit }));
  }, []);

  return (
    <>
      <div
        className="bg-white mt-8 dark:bg-gray-800 rounded-lg xl:col-span-9 lg:col-span-12 md:col-span-12 col-span-12"
        id="card-shadow"
      >
        <div className="mx-4 my-4">
          <h2 className="text-3xl">
            Forecast in{" "}
            <span className="font-bold ">
              {cityData.name}, {cityData.sys.country}
            </span>
          </h2>
          <h3 className="text-2xl mt-2">{cityData?.dt}</h3>
        </div>

        <div className=" flex justify-evenly flex-wrap gap-6 mx-4 my-6">
          <FirstCard
            city={cityData.name}
            temp={cityData.main.temp}
            high={cityData.main.temp_max}
            low={cityData.main.temp_min}
            feelsLike={cityData.main.feels_like}
            iconSrc={cityData?.iconSrc}
            description={cityData?.weather[0].description}
            suggestion={cityData?.weather[0].main}
            tempUnit={tempUnit}
          />
          <SecondCard
            visibility={cityData?.visibility}
            wind={cityData?.wind?.speed}
            humidity={cityData?.main?.humidity}
            cloudliness={cityData?.clouds?.all}
            tempUnit={tempUnit}
          />
          <ThirdCard
            sunrise={cityData.sys.sunrise}
            sunset={cityData.sys.sunset}
          />
        </div>
      </div>
    </>
  );
}

export default MainCard;
