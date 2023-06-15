import React, { useContext, useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, child, get, update } from "firebase/database";

const DatabaseContext = React.createContext();

export function useDatabase() {
  return useContext(DatabaseContext);
}

function DatabaseProvider({ children }) {
  function updateUserData({ userId, ...inputs }) {
    const updates = {};
    for (let key in inputs) updates[`users/${userId}/${key}`] = inputs[key];
    return update(ref(database), updates);
  }

  function readUserData({ userId }) {
    return get(ref(database, `users/${userId}`));
  }

  const value = {
    updateUserData,
    readUserData,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

export default DatabaseProvider;
