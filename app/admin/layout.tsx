import React from "react";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="px-10 pt-5">
      <section>{children}</section>
    </div>
  );
};

export default AdminLayout;
