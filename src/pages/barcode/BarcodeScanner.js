import { Button, Stack, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { BarcodeSubtext, ScannerBox } from '../../assets/styles/Barcode.style';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages.js';
import { useIsDevelopment } from '../../utils/use-is-development.js';

const BarcodeScanner = ({ codes, onNext }) => {
  const t = useTranslation();
  const is_dev = useIsDevelopment();
  const [input, setInput] = useState(null);
  const [stopStream, setStopStream] = useState(false);
  const [error, setError] = useState(null);
  let [recording, set_recording] = useState(false);
  const handleOnChange = useCallback(
    (err, result) => {
      set_recording(true);
      if (result) {
        if (codes.includes(result.text)) {
          onNext();
        }
      }
      if (err) return;
      return () => {
        set_recording(false);
        setInput(null);
        setStopStream(false);
        setError(null);
      };
    },
    [codes, onNext]
  );

  const onError = (error) => {
    if (error.name === 'NotAllowedError') {
      setError(t('Camera access denied'));
      setStopStream(true);
    } else {
      if (is_dev) console.log(error);
    }
  };

  const handleOnSubmit = () => {
    if (input === null) setError(t('please enter bar code'));
    else if (!codes.includes(input)) setError(t('Wrong code'));
    else onNext();
  };
  return (
    <>
      <ScannerBox
        style={{ position: 'relative' }}
        className='cool-border-thing'
      >
        <BarcodeScannerComponent
          width={310}
          height={282}
          onUpdate={handleOnChange}
          onError={onError}
          stopStream={stopStream}
        />
        {recording === false && (
          <div
            style={{
              position: 'absolute',
              top: 4,
              left: 4,
              bottom: 4,
              right: 4,
              backgroundColor: 'var(--button-color)',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>
              {error === t('Camera access denied')
                ? t('Camera access denied')
                : t('Waiting for camera...')}
            </div>
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            top: '100%',
            backgroundColor: 'transparent',
          }}
        >
          <BarcodeSubtext>
            {t('Scan the right bar code or scan the number')}
          </BarcodeSubtext>
        </div>
      </ScannerBox>
      <Whitespace height={55} />
      <Stack spacing={2} direction='row' sx={{ margin: '0 1rem' }}>
        <TextField
          id='standard-basic'
          label={t('write code...')}
          variant='standard'
          margin='dense'
          name='team_name'
          required
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          error={!!error}
          helperText={error && error}
        />
        <Button
          variant='outlined'
          size='small'
          onClick={handleOnSubmit}
          sx={{ width: '8rem', height: '2rem',marginTop: '1.6rem!important' }}
        >
          {t('Submit')}
        </Button>
      </Stack>
    </>
  );
};

export default BarcodeScanner;
