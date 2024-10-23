import { useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import background from "../public/homeBG.jpg";

export default function Home() {
  // bg-[url(./public/homeBG.jpg)]
  return (
    <>
      <div className={`min-h-screen flex justify-center`}>
        <Outlet />
      </div>
    </>
  );
}
