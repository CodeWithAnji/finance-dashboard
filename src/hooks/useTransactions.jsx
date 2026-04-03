import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const useTransactions = () => {
  return useContext(AppContext);
};
