import React, { useEffect } from 'react';

const NoInternet = () => {
  useEffect(() => {
    document.title = 'Patient 0';
  });

  return <div></div>;
};

export default NoInternet;
