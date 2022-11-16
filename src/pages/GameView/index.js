import { differenceInSeconds, format } from 'date-fns';
import { ref, update } from 'firebase/database';
import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Game1 from '../../components/games/Game1';
import Game2 from '../../components/games/Game2';
import Game3 from '../../components/games/Game3';
import Game4 from '../../components/games/Game4';
import Game5 from '../../components/games/Game5';
import Game6 from '../../components/games/Game6';
//import Game5 from '../../components/games/Game5';
import Instructions from '../../components/instructions';
import StartInstruction from '../../components/instructions/StartInstruction';
import PrevideoScreen from '../../components/PrevideoScreen';
import Stack from '../../components/stack/Stack';
import StepConnectPhones from '../../components/StepConnectPhones';
import StepSetTeamName from '../../components/StepSetTeamName';
import TimeThingy from '../../components/time/TimeThingly';
import Topbar from '../../components/topbar/Topbar';
import TopScore from '../../components/topscore/TopScore';

import {
  DEVELOPMENT_PARK_NAME,
  HOW_LONG_DO_WE_HAVE_IN_SECONDS,
} from '../../constant/StaticData';
import {
  IsOptimusMasterControllerPrimeContext,
  RoomContext,
} from '../../context/BaseContext';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import { database, useFirebase } from '../../utils/firebase';
import { IsDevelopmentContext } from '../../utils/use-is-development';

const GameView = () => {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let is_optimus_master_controller_prime =
    searchParams.get('is_optimus_master_controller_prime') === '';

  let { id, kist_naam } = useParams();
  let room_ref = ref(database, `rooms/${id}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let room = useFirebase(room_ref) ?? {};

  let step = room?.step ?? 0;

  let t = useTranslation();

  useEffect(() => {
    document.body.scrollTop = 0;
  }, [step]);

  //let date = useDate();
  let date = new Date();
  let finished_time = room?.finished_time;
  let seconds_elapsed = differenceInSeconds(
    finished_time ?? date,
    room?.start_time
  );

  let is_development =
    kist_naam === DEVELOPMENT_PARK_NAME &&
    process.env.REACT_APP_MODE === 'development';

  if (seconds_elapsed > HOW_LONG_DO_WE_HAVE_IN_SECONDS) {
    return (
      <div
        className='height-height'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Whitespace height={32} />
        <div style={{ paddingLeft: 32, paddingRight: 32 }}>
          {t(
            "Unfortunately, time is up. And you didn't manage to open the box this time. But see it as something good, you were together. Really together!"
          )}
        </div>
        <Whitespace height={32} />
        <div style={{ paddingLeft: 32, paddingRight: 32 }}>
          <button
            onClick={() => {
              update(room_ref, { timeout: 1 });
              navigate('/');
            }}
          >
            {t('Continue')}
          </button>
        </div>
      </div>
    );
  }
  return (
    <Stack
      wrappers={[
        <IsOptimusMasterControllerPrimeContext.Provider
          value={is_optimus_master_controller_prime}
        />,
        <RoomContext.Provider value={room_ref} />,
        <IsDevelopmentContext.Provider value={is_development} />,
      ]}
    >
      <div
        className='height-height'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Topbar>
          <TimeThingy room={room} />
        </Topbar>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {step === 0 && (
            <StepSetTeamName
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, {
                  id: id,
                  kist_naam: kist_naam,
                  step: 1,
                  // Don't set the start time here!
                  // We only want to start the timer after the connect phones screen
                  // start_time: Date.now(),
                  timeout: 0,
                  date: format(date, 'dd-MM-yyyy'),
                });
              }}
              RoomContext={RoomContext}
            />
          )}
          {step === 1 && (
            <Instructions
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, {
                  step: 2,
                                    start_time: Date.now(),
                });
              }}
              IsOptimusMasterControllerPrimeContext={
                IsOptimusMasterControllerPrimeContext
              }
            />
          )}
          {step === 2 && (
            <PrevideoScreen
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, { step: 3 });
              }}
              url={t('game1VideoUrl')}
            />
          )}
          {step === 3 && (
            <Game1
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, { step: 4 });
              }}
            />
          )}

          {step === 4 && (
            <PrevideoScreen
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }

                update(room_ref, { step: 5 });
              }}
              url={t('game2VideoUrl')}
            />
            )}

            {step === 5 && (
              <Game2
                onNext={() => {
                  if (!is_optimus_master_controller_prime) {
                    window.alert(t('Only the gamemaster can control the game.'));
                    return;
                  }
                  update(room_ref, { step: 6 });
                }}
              />
            )}
  
            {step === 6 && (
              <PrevideoScreen
                onNext={() => {
                  if (!is_optimus_master_controller_prime) {
                    window.alert(t('Only the gamemaster can control the game.'));
                    return;
                  }
  
                  update(room_ref, { step: 7 });
                }}
                url={t('game3VideoUrl')}
              />
          )}
          {step === 7 && (
            <Game3
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, { step: 8 });
              }}
            />
          )}
          {step === 8 && (
            <PrevideoScreen
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, { step: 9 });
              }}
              url={t('game4VideoUrl')}
            />
          )}
          {step === 9 && (
            <Game4
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, { step: 10 });
              }}
            />
          )}
          {step === 10 && (
            <PrevideoScreen
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, { step: 11 });
              }}
              url={t('game5VideoUrl')}
            />
          )}
          {step === 11 && (
            <Game5
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, { step: 12 });
              }}
            />
          )}
           {step === 12 && (
            <PrevideoScreen
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, { step: 13 });
              }}
              url={t('game6VideoUrl')}
            />
          )}
          {step === 13 && (
            <Game6
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, { step: 14 });
              }}
            />
          )}
          {step === 14 && (
            <PrevideoScreen
              onNext={() => {
                if (!is_optimus_master_controller_prime) {
                  window.alert(t('Only the gamemaster can control the game.'));
                  return;
                }
                update(room_ref, {
                  step: 15,
                  finished_time: Date.now(),
                  total_time_spent_score:
                    differenceInSeconds(Date.now(), room.start_time ?? 0) +
                    (room.hints_penalty ?? 0) * 60,
                });
              }}
              url={t('gameeindeVideoUrl')}
            />
          )}
          {step === 15 && (
            <TopScore RoomContext={RoomContext} to='../end/leader-board' />
          )}
        </div>
      </div>
    </Stack>
  );
};

export default GameView;
