import React from 'react';

const Broadcasting = () => {
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="text-white text-3xl font-bold">Broadcasting Live!</div>
      <div className="mt-4">
        <div className="rounded-full h-3 w-3 bg-red-500 inline-block m-1 animate-bounce"></div>
        <div className="rounded-full h-3 w-3 bg-yellow-500 inline-block m-1 animate-bounce"></div>
        <div className="rounded-full h-3 w-3 bg-green-500 inline-block m-1 animate-bounce"></div>
      </div>
    </div>
  );
};

export default Broadcasting;
