// src/contexts/DataContext/index.test.js

import { DataContext, useData } from "./DataContext";
import { renderHook } from "@testing-library/react";
import { useContext } from "react";

//  Vérifie que DataContext est bien un context React
describe("DataContext", () => {
  it("should be defined", () => {
    expect(DataContext).toBeDefined();
  });

  it("useData should return the correct context value", () => {
    const testValue = { test: "value" };

    const wrapper = ({ children }) => (
      <DataContext.Provider value={testValue}>{children}</DataContext.Provider>
    );

    const { result } = renderHook(() => useData(), { wrapper });
    expect(result.current).toEqual(testValue);
  });
});