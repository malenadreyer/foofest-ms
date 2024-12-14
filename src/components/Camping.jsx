import React, { useState, useEffect } from "react";
import Image from "next/image";
import backgroundCard from "../../public/pics/card.png";
import backgroundWhite from "../../public/pics/white.png";
import Loading from "./Loading";

function Camping({ selectedCampingArea, setCampingArea, ticketCount, setReservationId }) {
  const [campingData, setCampingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null); // State for countdown timer

  useEffect(() => {
    fetch("https://peach-polar-planarian.glitch.me/available-spots")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch camping data");
        }
        return response.json();
      })
      .then((data) => {
        setCampingData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching camping data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // If a camping spot is selected, start the reservation process
    if (selectedCampingArea) {
      fetch("https://peach-polar-planarian.glitch.me/reserve-spot", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area: selectedCampingArea,
          amount: ticketCount,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Store the reservation ID from the response
          setReservationId(data.id);
          // Start the countdown
          setRemainingTime(300); // 5 minutes in seconds
        })
        .catch((error) => {
          console.error("Error reserving camping spot:", error);
          setError(error.message);
        });
    }
  }, [selectedCampingArea, ticketCount, setReservationId]);

  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000); // Decrease every second
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Clear interval when component unmounts or time runs out
  }, [remainingTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  if (campingData.length === 0) {
    return <p className="text-center">No camping options available.</p>;
  }

  return (
    <div className="mt-10">
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-1 w-[400px] m-auto mt-5 lg:grid-cols-1 gap-5">
          {campingData.map((area) => {
            const isDisabled = area.available < ticketCount || area.available === 0;
            const isSelected = selectedCampingArea === area.area;

            return (
              <li
                key={area.area}
                onClick={() => {
                  if (!isDisabled) setCampingArea(area.area);
                }}
                className={`relative group p-4 rounded-lg ${
                  isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                } ${isSelected ? "border-white" : "border-transparent"}`}
              >
                <div className={`absolute inset-0 before:content-[''] before:absolute before:-top-1 before:-right-8 before:-z-10 before:w-full before:h-24 before:border-[8px] before:border-[#881523] before:opacity-100 before:rounded-lg transition-all duration-500 ease-out group-hover:top-[1rem] group-hover:left-[1rem] ${
                    isSelected ? "before:border-[white]" : ""
                  }`}></div>

                <div className="relative w-full p-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500 ease-out rounded-2xl flex flex-col justify-center items-center">
                  <div className="absolute rounded-xl inset-0 z-0">
                    <Image
                      src={isSelected ? backgroundWhite : backgroundCard}
                      alt="Camping area background"
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      className="w-full rounded-xl"
                    />
                  </div>

                  <div className="relative flex justify-between gap-10">
                    <h4 className={`text-lg ${isSelected ? "text-black" : ""}`}>{area.area}</h4>
                    <p className={`opacity-50 ${isSelected ? "text-black" : ""}`}>
                      {area.available}/{area.spots} spots available
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Show reservation timer */}
      {selectedCampingArea && remainingTime > 0 && (
        <div className="mt-5 text-center">
          <p className="text-lg">Reservation Time Left: {formatTime(remainingTime)}</p>
        </div>
      )}
    </div>
  );
}

export default Camping;
