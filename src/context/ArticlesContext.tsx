import React, { useState, createContext, ReactNode } from 'react';

type ArticlesContextProps = {
  children: ReactNode;
};

type ArticlesContextType = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const initialValue = {
  title: '',
  setTitle: () => {''},
};

export const ArticlesContext = createContext<ArticlesContextType>(initialValue);

export const ArticlesContextProvider = ({ children }: ArticlesContextProps) => {
  const [title, setTitle] = useState(initialValue.title);
  return <ArticlesContext.Provider value={{ title, setTitle }}>{children}</ArticlesContext.Provider>;
};