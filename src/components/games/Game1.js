import { child, set } from 'firebase/database';
import React, { useContext } from 'react';
import assets from '../../assets';
import { RoomContext } from '../../context/BaseContext';
import { useTranslation } from '../../languages';
import BarcodeScanner from '../../pages/barcode/BarcodeScanner';
import { HintsDialog, PreviousMediaDialog } from '../../utils/Dialog';
import { useFirebase } from '../../utils/firebase';
import { useDialogRef } from '../../utils/use';
import { DevButton } from '../DevButton';

const Game1 = ({ onNext }) => {
  let t = useTranslation();
  let dialog_1 = useDialogRef();
  let previous_media_dialog = useDialogRef();
  let room_ref = useContext(RoomContext);
  let room = useFirebase(room_ref);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <DevButton onClick={onNext} />

      <PreviousMediaDialog
        ref={previous_media_dialog}
        url={t('game1VideoUrl')}
      />

      <HintsDialog
        ref={dialog_1}
        hints={[
          {
            bought: room?.bought_hints?.hint_1a,
            penalty_minutes: 1,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_1a'), true);
            },
            text: t('hintText_1a'),
          },
          {
            bought: room?.bought_hints?.hint_1b,
            penalty_minutes: 3,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_1b'), true);
            },
            text: t('hintText_1b'),
          },
          {
            bought: room?.bought_hints?.hint_1c,
            penalty_minutes: 10,
            onBuy: () => {
              set(child(room_ref, 'bought_hints/hint_1c'), true);
            },
            text: t('hintText_1c'),
          },
        ]}
      />
      
      <div style={{textAlign: 'center'}}>{t('game1ClueText')}</div>
      <BarcodeScanner codes={['1397', '11283']} onNext={onNext} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          marginTop: '1rem',
        }}
      >
        <button
          className='outline'
          onClick={() => {
            previous_media_dialog.current.showModal();
          }}
        >
          {t('Video')}
        </button>
        <div style={{ width: 16 }} />
        <button onClick={() => dialog_1.current.showModal()}>
          {t('Hints')}
        </button>
      </div>
    </div>
  );
};

export default Game1;
