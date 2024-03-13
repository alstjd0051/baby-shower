"use client";
import { useThemeChange } from "@/components/hooks/theme";
import React from "react";
import { FaLightbulb } from "react-icons/fa";
import { MdModeNight } from "react-icons/md";
import { motion } from "framer-motion";

type Props = {};

const ThemeSwitch = (props: Props) => {
  const { scope, theme, setTheme } = useThemeChange();
  return (
    <div className="float-right">
      {theme === "light" ? (
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 1.5 }}
        >
          <button ref={scope} onClick={() => setTheme("dark")}>
            <FaLightbulb className="text-white fill-yellow-500 rounded-full p-2 w-10 h-10" />
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 1 }}
        >
          <button ref={scope} onClick={() => setTheme("light")}>
            <MdModeNight className=" rounded-full p-2 w-10 h-10" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ThemeSwitch;
