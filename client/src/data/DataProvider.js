import { useState, useMemo } from 'react';

import DataContext from "./DataContext";

function DataProvider({ children }) {
  const value = {};
  return(
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;