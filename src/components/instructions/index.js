import React from 'react';
import assets from '../../assets';
import {
  InstructionContent,
  InstructionHeader,
  InstructionStep,
} from '../../assets/styles/Instruction';
import { Whitespace } from '../../Elements';
import { useTranslation } from '../../languages';
import { DevButton } from '../DevButton';

const Instructions = ({ onNext }) => {
  let t = useTranslation();

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        textAlign: 'center',
      }}
    >
      <DevButton onClick={onNext} />
      <Whitespace height={16} />
      <InstructionHeader>Start Instructions</InstructionHeader>
      <InstructionContent>
      During the game, please follow the following steps:
        </InstructionContent>
      <div
        style={{
          //paddingTop:25,
          paddingLeft: 15,
          paddingRight: 15,
          //paddingBottom:25,
          display: 'flex',
          flexDirection: 'column',
          marginTop: 25,
          arginBottom: 25,
        }}
      >
  <InstructionStep>Step 1.</InstructionStep>
        <InstructionContent> Listen carefully to the host. This one will jointly 
          start the game. Do not proceed to the next step yet, because at the next step, time will start running.</InstructionContent>
        <InstructionStep>Step 2.</InstructionStep>
        <InstructionContent>
        Each team has one team captain. This one holds the phone and makes sure everyone hears the commands properly.        </InstructionContent>
        <InstructionStep>Step 3.</InstructionStep>
        <InstructionContent>
        In each level of the game, you will find a barcode. The team captain scans this barcode 
        with the camera of the mobile phone.  If you cannot scan the barcode, enter the number 
        number below.        </InstructionContent>
        <InstructionStep>Step 4.</InstructionStep>
        <InstructionContent>
        Don't force anything, keep everything together and play well together. Then you will be one step closer to 
        solving the riddles.        </InstructionContent>
        <InstructionContent>
          <img src={assets.images.common?.StartInstruction} alt='' />
        </InstructionContent>
        <InstructionContent>
          Are you ready? Time starts from the next screen! Good luck!
        </InstructionContent>
        <Whitespace height={16} />
        <button onClick={onNext}>{t('Continue')}</button>
        <Whitespace height={16} />

      </div>
    </div>
  );
};

export default Instructions;
