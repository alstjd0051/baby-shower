import { FormEventHandler } from "react";

export const textareaAutosize: FormEventHandler<HTMLTextAreaElement> = (e) => {
  const element = e.target as HTMLTextAreaElement;
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
};
