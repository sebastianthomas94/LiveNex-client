// SharedContext.js
import React, { createContext, useContext, useState } from 'react';

const SharedContext = createContext();


export const SharedProvider = ({ children }) => {
  const [isLive, setIsLive] = useState(false);

  return (
    <SharedContext.Provider value={{ isLive, setIsLive }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => {
  return useContext(SharedContext);
};
