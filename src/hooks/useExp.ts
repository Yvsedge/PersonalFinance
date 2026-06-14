import { useContext } from "react";
import { ExpContext } from "../context/ExpContext";

export function useExp() {
    return useContext(ExpContext);
}
