import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface PageInfo {
  id: string;
  Page: JSX.Element;
}

const useAuthenticatedPages = (initialPages: PageInfo[]) => {
  const [activePage, setActivePage] = useState<string>(initialPages[0].id);
  const handleClick = (id: string) => {
    setActivePage(id);
  };
  return { activePage, handleClick };
};

export default useAuthenticatedPages;
