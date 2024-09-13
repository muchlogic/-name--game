import { useEffect, useState } from "react";
import background from "../public/homeBG.jpg";

export default function Create() {
  return (
    <>
      <div
        className={`min-h-screen bg-[url(./public/homeBG.jpg)] flex justify-center`}
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-8xl font-serif py-10">Create Card</h1>
          <div className="text-center bg-white  py-5 px-40 rounded-md flex flex-col justify-center items-center shadow-md shadow-black">
            <form className="flex flex-col">
              <input
                type="text"
                id="Question"
                className="m-4 p-4 rounded-md text-center border-[black] border-[1px]"
                placeholder="Put Question Here"
              />
              <div className="flex flex-row">
                <input
                  type="text"
                  id="Answer-1"
                  className="m-4 p-4 rounded-md text-center border-[black] border-[1px]"
                  placeholder="Answer 1"
                />
                <input
                  type="text"
                  id="Answer-2"
                  className="m-4 p-4 rounded-md text-center border-[black] border-[1px]"
                  placeholder="Answer 2"
                />
              </div>
              <div className="flex flex-row">
                <input
                  type="text"
                  id="Answer-3"
                  className="m-4 p-4 rounded-md text-center border-[black] border-[1px]"
                  placeholder="Answer 3"
                />
                <input
                  type="text"
                  id="Answer-4"
                  className="m-4 p-4 rounded-md text-center border-[black] border-[1px]"
                  placeholder="Answer 4"
                />
              </div>
              <button
                onClick={() => handleHost()}
                className="bg-gray-800 text-white text-lg rounded-md mt-4 py-4 hover:bg-slate-900"
              >
                Submit Card
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
