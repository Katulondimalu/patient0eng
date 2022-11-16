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
      <InstructionHeader>Start Instructies</InstructionHeader>
      <InstructionContent>
        Je gaat je Patient 0 zoeken door samen met je team een aantal inventieve puzzels op te lossen. 
        Daarvoor heb ik een aantal stappen om je op weg te helpen.
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
        <InstructionStep>Stap 1.</InstructionStep>
        <InstructionContent>Luister goed naar de host. Deze zal gezamenlijk het spel 
          starten. Ga nog niet verder met de volgende stap, want bij de volgende stap begint de tijd te lopen.</InstructionContent>
        <InstructionStep>Stap 2.</InstructionStep>
        <InstructionContent>
        Elk team heeft één teamcaptain. Deze houdt de telefoon vast en zorgt ervoor dat iedereen 
        de opdrachten goed hoort.
        </InstructionContent>
        <InstructionStep>Stap 3.</InstructionStep>
        <InstructionContent>
        In elk level van de game vind je een streepjescode. De teamcaptain scant deze streepjescode 
        met de camera van het mobieltje.  Lukt het niet de streepjescode te scannen, vul dan het 
        nummer in dat je er onder ziet staan.
        </InstructionContent>
        <InstructionStep>Stap 4.</InstructionStep>
        <InstructionContent>
        Forceer niks, hou alles goed bij elkaar en speel goed samen. Dan ben je een stap dichter bij 
        het redden van moeder aarde.
        </InstructionContent>
        <InstructionContent>
          <img src={assets.images.common?.StartInstruction} alt='' />
        </InstructionContent>
        <InstructionContent>
          Ben je er klaar voor? Vanaf het volgende scherm start de tijd! Succes!
        </InstructionContent>
        <Whitespace height={16} />
        <button onClick={onNext}>{t('Continue')}</button>
        <Whitespace height={16} />
      </div>
    </div>
  );
};

export default Instructions;
