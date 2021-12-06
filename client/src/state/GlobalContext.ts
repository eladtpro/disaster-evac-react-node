import React from "react";
import { createContext } from "react";

interface IGlobalContext {
    loading: boolean | undefined;
    setLoading: (show: boolean | undefined) => void;
    notification: { message: React.ReactNode, error?: boolean } | undefined;
    setNotification: (note: { message: React.ReactNode, error?: boolean } | undefined) => void;
}

const initialValue: IGlobalContext = {
    loading: undefined,
    setLoading: (show: boolean | undefined) => { },
    notification: undefined,
    setNotification: (note: { message: React.ReactNode, error?: boolean } | undefined) => {}
}

const GLobalContext = createContext<IGlobalContext>(initialValue);

export { initialValue, GLobalContext };
export type { IGlobalContext };