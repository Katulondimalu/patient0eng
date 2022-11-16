import React from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets';
import { Whitespace } from '../Elements';
import { useTranslation } from '../languages';

const SplashScreen = () => {
  const t = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className='height-height'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        overflow: 'scroll',
        paddingBottom: 20,
      }}
    >
      <div style={{ minHeight: 16 }} />
      <div
        style={{
          textAlign: 'center',
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        <h2>{t('Patient 0')}</h2>
      </div>
      <img
        // @ts-ignore
        src={assets.images.common.splashscreenIcon}
        style={{
          width: '90%',
          objectFit: 'cover',
          borderRadius: 10,
          alignSelf: 'center',
          aspectRatio: '1',
          backgroundColor: `var(--background-color)`,
        }}
        alt='icon'
      />
      <Whitespace height={10} />

      <img
        src={assets.images.common.XboxIcon}
        style={{
          width: '100%',
          padding: 16,
          maxWidth: 250,
          alignSelf: `center`,
          transform: `translateY(10px)`,
        }}
        alt='icon'
      />

      <Whitespace height={10} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
        }}
      >
        <button className='outline' onClick={() => navigate('/score-today')}>
          {t('Scoreboard')}
        </button>
        <div style={{ width: 16 }} />
        <button
          onClick={() => {
            navigate('play' + window.location.search);
          }}
        >
          {t('Enter')}
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
