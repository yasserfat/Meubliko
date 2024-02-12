import React from 'react'

export default function Loader() {
  return (
    <>
      <div className="flex justify-center items-center h-24 my-12">
        <div className="rounded-full h-12 w-12 bg-violet-800 animate-ping"></div>
      </div>
    </>
  );
}
