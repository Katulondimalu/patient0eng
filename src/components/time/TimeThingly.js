import { AccessTime, Close } from '@mui/icons-material';
import { differenceInSeconds } from 'date-fns';
import { HOW_LONG_DO_WE_HAVE_IN_SECONDS } from '../../constant/StaticData';
import { useTranslation } from '../../languages';
import { Dialog } from '../../utils/Dialog';
import { secondsToMinutes } from '../../utils/helper';
import { useDate, useDialogRef } from '../../utils/use';

const TimeThingy = ({ room }) => {
  let date = useDate();
  let t = useTranslation();
  let finished_time = room?.finished_time;
  let seconds_elapsed = differenceInSeconds(
    finished_time ?? date,
    room?.start_time
  );
  let dialog = useDialogRef();

  if (room.start_time === null || room.start_time === undefined) {
    return null;
  }

  if (seconds_elapsed > HOW_LONG_DO_WE_HAVE_IN_SECONDS)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          color: 'red',
        }}
      >
        Time is up!
      </div>
    );

  return (
    <>
      <Dialog
        className='fancy-backdrop'
        ref={dialog}
        onClick={(e) => {
          dialog.current.close();
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 16,
            margin: 'auto',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1>Timing</h1>
            <Close
              onClick={() => {
                dialog.current.close();
              }}
            />
          </div>
          <div
            style={{
              minWidth: '100%',
              backgroundColor: `rgba(0, 0, 0, 0.2)`,
              borderRadius: 8,
              padding: 16,

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: '1.2em',
                fontVariant: 'tabular-nums',
              }}
            >
              <AccessTime />
              <div style={{ minWidth: 8 }} />
              {secondsToMinutes(seconds_elapsed)}
            </div>
            {t(
              'You have 180 minutes to finish the game. You will see the time you have left in the top of the screen.'
            )}
          </div>

          <div
            style={{
              minWidth: '100%',
              backgroundColor: `rgba(0, 0, 0, 0.2)`,
              borderRadius: 8,
              padding: 16,

              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ color: '#af0000', fontSize: '1.2em' }}>- 10 min</div>
            {t(
              'For every hint you unlock, there will be some time added to your final score. You will still be able to play the full 90 minutes, but your final score will be a bit less.'
            )}
          </div>
        </div>
      </Dialog>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          color: finished_time != null ? 'green' : undefined,
          fontVariant: 'tabular-nums',
        }}
        onClick={() => {
          dialog.current.showModal();
        }}
      >
        <AccessTime />
        <div style={{ minWidth: 8 }} />
        {secondsToMinutes(seconds_elapsed)}
        <div style={{ minWidth: 8 }} />
        {room?.hints_penalty && (
          <span style={{ color: 'red' }}>
            {'- '}
            {room?.hints_penalty} min
          </span>
        )}
      </div>
    </>
  );
};

export default TimeThingy;

// import { AccessTime, Close } from '@mui/icons-material';
// import { differenceInSeconds } from 'date-fns';
// import { HOW_LONG_DO_WE_HAVE_IN_SECONDS } from '../../constant/StaticData';
// import { useTranslation } from '../../languages';
// import { Dialog } from '../../utils/Dialog';
// import { useDate, useDialogRef } from '../../utils/use';
// const TimeThingy = ({ room }) => {
//   let date = useDate();
//   let t = useTranslation();
//   let finished_time = room?.finished_time;
//   let seconds_elapsed = differenceInSeconds(
//     finished_time ?? date,
//     room?.start_time
//   );

//   let time_from_90_minutes = HOW_LONG_DO_WE_HAVE_IN_SECONDS - seconds_elapsed;

//   let dialog = useDialogRef();

//   if (room.start_time == null) {
//     return null;
//   }

//   if (time_from_90_minutes < 0) {
//     return (
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           color: 'red',
//         }}
//       >
//         Time is up!
//       </div>
//     );
//   }

//   return (
//     <>
//       <Dialog
//         className='fancy-backdrop'
//         ref={dialog}
//         onClick={(e) => {
//           dialog.current.close();
//         }}
//       >
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             borderRadius: 16,

//             margin: 'auto',

//             width: '100%',
//           }}
//         >
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}
//           >
//             <h1>Timing</h1>
//             <Close
//               onClick={() => {
//                 dialog.current.close();
//               }}
//             />
//           </div>
//           <div
//             style={{
//               minWidth: '100%',
//               backgroundColor: `rgba(0, 0, 0, 0.2)`,
//               borderRadius: 8,
//               padding: 16,

//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',

//               marginBottom: 16,
//             }}
//           >
//             <div
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 fontSize: '1.2em',
//                 fontVariant: 'tabular-nums',
//               }}
//             >
//               <AccessTime />
//               <div style={{ minWidth: 8 }} />
//               {(time_from_90_minutes / 60 - 1).toFixed(0)}:
//               {(time_from_90_minutes % 60).toFixed(0).padStart(2, '0')}
//             </div>
//             {t(
//               'You have 90 minutes to finish the game. You will see the time you have left in the top of the screen.'
//             )}
//           </div>

//           <div
//             style={{
//               minWidth: '100%',
//               backgroundColor: `rgba(0, 0, 0, 0.2)`,
//               borderRadius: 8,
//               padding: 16,

//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <div style={{ color: '#af0000', fontSize: '1.2em' }}>- 10 min</div>
//             {t(
//               'For every hint you unlock, there will be some time added to your final score. You will still be able to play the full 90 minutes, but your final score will be a bit less.'
//             )}
//           </div>
//         </div>
//       </Dialog>

//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           color: finished_time != null ? 'green' : undefined,
//           fontVariant: 'tabular-nums',
//         }}
//         onClick={() => {
//           dialog.current.showModal();
//         }}
//       >
//         <AccessTime />
//         <div style={{ minWidth: 8 }} />
//         {(time_from_90_minutes / 60 - 1).toFixed(0)}:
//         {(time_from_90_minutes % 60).toFixed(0).padStart(2, '0')}
//         <div style={{ minWidth: 8 }} />
//         {room?.hints_penalty && (
//           <span style={{ color: 'red' }}>
//             {'- '}
//             {room?.hints_penalty} min
//           </span>
//         )}
//       </div>
//     </>
//   );
// };

// export default TimeThingy;
