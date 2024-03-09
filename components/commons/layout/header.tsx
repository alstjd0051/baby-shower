import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="h-12">
      <div className="flex items-center justify-between h-full ">
        <div className="text-white">Header</div>
      </div>
    </div>
  );
};

export default Header;
