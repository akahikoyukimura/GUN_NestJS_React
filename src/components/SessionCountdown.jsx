import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/authStorage";
import "./SessionCountdown.css";

const SessionCountdown = () => {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const token = getToken();

    if (!token) return;

    try {
      const { exp } = jwtDecode(token);

      const updateCountdown = () => {
        const now = Math.floor(Date.now() / 1000);
        const remaining = Math.max(exp - now, 0);

        setSecondsLeft(remaining);
      };

      updateCountdown();

      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    } catch (error) {
      console.error("Invalid JWT:", error);
    }
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const format = (value) => String(value).padStart(2, "0");

  return (
    <div className="session-countdown">
      {/* HOURS */}
      <div className="time-box">
        <span>{format(hours)}</span>
      </div>

      <span className="time-separator">:</span>

      {/* MINUTES */}
      <div className="time-box">
        <span>{format(minutes)}</span>
      </div>

      <span className="time-separator">:</span>

      {/* SECONDS */}
      <FlipClock value={format(seconds)} />
    </div>
  );
};

/*
 * Realistic flip clock
 */
const FlipClock = ({ value }) => {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [flipping, setFlipping] = useState(false);
  useEffect(() => {
    if (value === current) return;

    setPrevious(current);
    setCurrent(value);
    setFlipping(true);

    const timer = setTimeout(() => {
      setFlipping(false);
    }, 650);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flip-clock">
      {/* Static TOP - new number */}
      <div className="flip-half flip-top">
        <span>{current}</span>
      </div>

      {/* Static BOTTOM - new number */}
      <div className="flip-half flip-bottom">
        <span>{current}</span>
      </div>

      {flipping && (
        <>
          {/* OLD TOP → flips down */}
          <div className="flip-half flip-old-top">
            <span>{previous}</span>
          </div>

          {/* NEW BOTTOM → flips into place */}
          <div className="flip-half flip-new-bottom">
            <span>{current}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SessionCountdown;
