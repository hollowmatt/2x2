import React, {useContext} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const appContext = useContext(AppContext);
  const authenticated = appContext.loggedIn;
  let useLocation = useLocation();

  if(!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  } else {
    return children;
  }
};

export default ProtectedRoute;