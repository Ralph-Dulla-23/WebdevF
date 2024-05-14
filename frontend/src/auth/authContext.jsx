import React, { createContext, useState } from 'react'

export const AuthContext = createContext({
  ID: null
})

function AuthProvider({ children }) {
  const [ID, setID] = useState("");
  const [SelectedAvailableItem, setSelectedAvailableItem] = useState("");
  const [QuantitySelected, setSelectedQuantity] = useState("");

  return (
    <AuthContext.Provider value={{ ID, setID, SelectedAvailableItem, setSelectedAvailableItem, QuantitySelected, setSelectedQuantity}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider