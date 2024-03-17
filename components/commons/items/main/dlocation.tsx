"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";

type Props = {
  loading: boolean;
};

const DateAndLocation = ({ loading }: Props) => {
  const [diff, setDiff] = useState<string>("");

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD");
    console.log(currentDate);

    const targetDate = moment("2024-03-23");

    const differenceInDays = moment
      .duration(targetDate.diff(currentDate))
      .asDays();

    const diffString = `D - ${differenceInDays}`;
    setDiff(diffString);
  }, []);

  return (
    <div
      className={` ${
        loading ? "invisible" : "visible"
      }   px-5 leading-none w-fit justify-center *:text-[#624f3c] text-[1em] *:md:text-[2em]`}
    >
      <h1 className="text-white font-bold">3월 23일(토) 오후 5시 30분</h1>
      {diff && <p className="text-center">{diff}</p>}
    </div>
  );
};

export default DateAndLocation;
