import { useState,useEffect } from "react";

function battle() {
    const [ enemyHp,setEnemyHp ] = useState(10);
    const [ maxEnemyHp,setMaxEnemyHp ] = useState(10);
    const [ enemyAttack,setEnemyAttack ] = useState(1);
        
    const [ playerHp,setPlayerHp ] = useState(15);
    const [ maxPlayerHp,setMaxPlayerHp ] = useState(15);
    const [ playerAttack,setPlayerAttack ] = useState(1);

    const [ curExp,setCurExp ] = useState(0);
    const [ maxExp,setMaxExp ] = useState(5);

    /* Battle */
    useEffect(()=>{
        if(playerHp==0) return;

        if(enemyHp==0){
            setCurExp(curExp+enemyAttack);
            setMaxEnemyHp(maxEnemyHp*1.1);
            setEnemyHp(enemyHp+maxEnemyHp);
            setEnemyAttack(enemyAttack+1);
        }
        const battling = setInterval(()=>{
            setEnemyHp(enemyHp-playerAttack);
            setPlayerHp(playerHp-enemyAttack);
        },500);

        return () => {
            clearInterval(battling);
        };
    },[playerHp]);

    /* Level up */
    useEffect(()=>{
        if(maxExp > curExp) return;

        setMaxExp(maxExp * 1.1);
    },[curExp]);

    return(
        <>
            <div>적 HP : {enemyHp}</div>
            <div>HP : {playerHp}</div>
            <div>현재 경험치 : {curExp}/{maxExp}</div>
        </>
    )
}

export default battle