"use client";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function ReduxProvide({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
