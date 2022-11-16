import React from 'react';
import { Navigate } from 'react-router-dom';
import {
  DEVELOPMENT_PARK_NAME,
  ENVIRONMENT,
  PRODUCTION_PARK_NAME,
} from '../constant/StaticData';

const NoGame = () => {
  if (ENVIRONMENT === 'development') {
    return <Navigate to={`/${DEVELOPMENT_PARK_NAME}`} />;
  }
  return <Navigate to={`/${PRODUCTION_PARK_NAME}`} />;
};

export default NoGame;
