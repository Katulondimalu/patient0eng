import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const MakeGame = () => {
  let { kist_naam, language } = useParams();
  return (
    <Navigate
      to={`/${kist_naam}/${language}/game/${uuidv4()}?is_optimus_master_controller_prime`}
    />
  );
};

export default MakeGame;
