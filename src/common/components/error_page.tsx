import React from "react";
import Link from "next/link";

interface Props {
  title: string;
}
export const ErrorPage: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex flex-col justify-center py-24 bg-white items-center">
      <h2 className="">{title}</h2>
      <div className="">
        <Link href={"/"}>
          <a className="text-blue-600">{"Go to homepage"}</a>
        </Link>
      </div>
    </div>
  );
};
