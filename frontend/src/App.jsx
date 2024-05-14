import React from 'react'
import { RouterProvider } from "react-router-dom"

import AuthProvider from 'hooks/authContext'

import routers from 'router/routers'

function App() {

  return (
    <>

    <AuthProvider>
      <RouterProvider router={routers()}/>
    </AuthProvider>
      
    </>
  )
}

export default App