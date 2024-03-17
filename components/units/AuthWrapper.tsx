"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MainUploadPage from "../commons/items/upload";
import CarouselPage from "../commons/items/upload/carousel";
import useAuthenticatedPages from "../hooks/admin/authenitated";

type Props = {};
interface PageInfo {
  id: string;
  Page: JSX.Element;
}
const pages: PageInfo[] = [
  {
    id: "MainUpload",
    Page: <MainUploadPage />,
  },
  {
    id: "Carousel",
    Page: <CarouselPage />,
  },
];

const AuthWrapper = (props: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  useEffect(() => {
    if (user?.selector !== "admin") {
      process.env.NODE_ENV === "production" && router.replace("/");
    }
  }, [user, router]);

  const { activePage, handleClick } = useAuthenticatedPages(pages);

  return (
    <div>
      <nav className="flex items-center gap-x-5">
        {pages.map(({ id }, idx) => {
          return (
            <button
              key={idx}
              className={`${
                activePage === id && "underline underline-offset-8 "
              }`}
              onClick={() => handleClick(id)}
            >
              {id}
            </button>
          );
        })}
      </nav>
      <div className="mt-32">
        {pages.map(({ id, Page }) => (
          <section
            key={id}
            style={{ display: activePage === id ? "block" : "none" }}
          >
            {Page}
          </section>
        ))}
      </div>
    </div>
  );
};

export default AuthWrapper;
