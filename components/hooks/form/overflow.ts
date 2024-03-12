import { useEffect, useRef } from "react";

const useAutoResizeTextarea = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleTextareaResize = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener("input", handleTextareaResize);

    handleTextareaResize();

    return () => {
      textarea.removeEventListener("input", handleTextareaResize);
    };
  }, []);

  return { textareaRef };
};

export default useAutoResizeTextarea;
