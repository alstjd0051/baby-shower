import { animate, useAnimate } from "framer-motion";
import { useTheme } from "next-themes";

interface themeProps {}
export const useThemeChange = () => {
  const { theme, setTheme } = useTheme();
  const [scope, animate] = useAnimate();
  setTheme(theme!);
  animate([
    theme === "light" && "system"
      ? [scope.current, { rotate: 0 }]
      : [scope.current, { rotate: 360 }],
  ]);
  return { scope, theme, setTheme };
};
