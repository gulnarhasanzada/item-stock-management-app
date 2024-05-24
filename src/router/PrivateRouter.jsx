import React from 'react'
import {Navigate} from 'react-router-dom'

const PrivateRouter = ({
    user,
    redirectPath = '/',
    children,
  }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
}

export default PrivateRouter
