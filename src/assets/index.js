import telefoonNfout from './audio/telefoon-fout.mp3';
import telefoonGoed from './audio/telefoon-goed.mp3';
import step_1 from './images/cleanup/cleanup_stap_1.gif';
import MicrosoftIcon from './images/common/Microsoft.png';
import RetrieveCase from './images/common/RetrieveCase.png';
import splashscreenIcon from './images/common/splashscreen.jpeg';
import StartInstruction from './images/common/globe_turning.gif';
import watermark from './images/common/watermark.png';
import WindowsIcon from './images/common/planeten143.png';
import xbox from './images/common/XBOXseriesX.jpg';
import XboxIcon from './images/common/logo_exp_inc_zwart.png';
import game1Clue from './images/game-clue/game1clue.png';
import game2Clue from './images/game-clue/game2clue.png';
import game4Clue from './images/game-clue/game4clue.png';
import game3Clue from './images/game-clue/insta_fav.webp';
import hint2b from './images/hints/hint2b.png';
import GBIcon from './images/language/GB.svg';
import NLIcon from './images/language/NL.svg';


const assets = {
  images: {
    language: {
      GBIcon,
      NLIcon,
    },
    common: {
      splashscreenIcon,
      watermark,
      xbox,
      StartInstruction,
      RetrieveCase,
      MicrosoftIcon,
      WindowsIcon,
      XboxIcon,
    },
    hints: {
      hint2b,
    },
    cleanups: [step_1],
    clues: {
      game1Clue,
      game2Clue,
      game3Clue,
      game4Clue,
    },
  },
  audio: {
    telefoonNfout,
    telefoonGoed,
  },
};

export default assets;
