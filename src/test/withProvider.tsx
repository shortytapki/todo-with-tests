import { StoreProvider } from "@app";
import { ReactNode } from "react";

export const WithProvider = (component: ReactNode) => {
  return <StoreProvider>{component}</StoreProvider>;
};
