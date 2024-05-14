import React from 'react'
import ReactDOM from 'react-dom/client'


import Dashboard from './Dashboard.jsx'
import Return from './Pages/Return/Return.jsx'
import Borrow from './Pages/Borrow/Borrow.jsx'

import Scan from './Pages/Scan/Scan.jsx'
import ScanR from './Pages/Scan/ScanR.jsx'
import ScanA from './Pages/Scan/ScanA.jsx'
import UpdateItems from './Pages/UpdateItems/UpdateItems.jsx'
import RequestUser from './Pages/Request/RequestUser.jsx'
import RequestAdmin from './Pages/Request/RequestAdmin.jsx'
import Request from './Pages/Request/Request.jsx'
import UItem from './Pages/UpdateItems/UItem.jsx'
import Pending from './Pages/Request/Pending.jsx'
import ScanB from './Pages/Scan/ScanB.jsx'
import ScanRequestAdmin from './Pages/Scan/ScanRequestAdmin.jsx'
import ScanDeadline from './Pages/Scan/ScanDeadline.jsx'
import AuthProvider from './auth/authContext.jsx'


import {createBrowserRouter,RouterProvider} from "react-router-dom";

import './CSS/Scan.css'
import './CSS/Return.css'
import './CSS/Borrow.css'
import './CSS/UpdateItems.css'
import './CSS/RequestAdmin.css'
import './CSS/RequestUser.css'
import './CSS/Request.css'
import './CSS/UItem.css'
import './CSS/Pending.css'


import './index.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScanA />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Return",
    element: <Return />,
  },
  {
    path: "/Borrow",
    element: <Borrow />,
  },
  {
    path: "/Scan",
    element: <Scan />
  },
  {
    path: "/ScanR",
    element: <ScanR />
  },
  {
    path: "/ScanA",
    element: <ScanA />
  },
  {
    path: "/ScanB",
    element: <ScanB />
  },
  {
    path: "/Update-Items",
    element: <UpdateItems />
  },
  {
    path: "/Request-User",
    element: <RequestUser />
  },
  {
    path: "/Request-Admin",
    element: <RequestAdmin />
  },
  {
    path: "/Request",
    element: <Request />
  },
  {
    path: "/UItem",
    element: <UItem />
  },
  {
    path: "/Pending",
    element: <Pending />
  },
  {
    path: "/ScanDeadline",
    element: <ScanDeadline />
  },
  {
    path: "/ScanRequestAdmin",
    element: <ScanRequestAdmin />
  },
  


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
