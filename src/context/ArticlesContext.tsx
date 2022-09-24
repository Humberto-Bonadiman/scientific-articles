import React, { useState, createContext, ReactNode } from 'react';

type ArticlesContextProps = {
  children: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type ArticlesContextType = {};

const initialValue = {

};

export const ArticlesContext = createContext<ArticlesContextType>(initialValue);

export const ArticlesContextProvider = ({ children }: ArticlesContextProps) => {

  return <ArticlesContext.Provider value={{}}>{children}</ArticlesContext.Provider>;
};