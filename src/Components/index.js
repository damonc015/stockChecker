import React, {useContext} from 'react';
import { Night } from '../App';
import NightMode from './NightMode';
import Menu from "./Menu";
import Clock from "./Clock";
import AltMenu from './AltMenu';

const Index = () => {

    const { day,menu } = useContext(Night);
    const isTimer = day?"dayMode":"nightMode";
    const isTimerClass = `timer ${isTimer}`
    const isAltTimerClass = `altTimer ${isTimer}`

    if(menu){
      return (
      <section className="timerContainer">
        <div className={isTimerClass}>
          <Menu></Menu>
          <Clock></Clock>
          <NightMode></NightMode>
        </div>
      </section>
    );
}else{
  return (
    <section className="altTimerContainer">
      <div className={isAltTimerClass}>
        <AltMenu></AltMenu>
      </div>
    </section>
  );
}
}

export default Index
