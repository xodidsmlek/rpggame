import { useState,useEffect } from "react";

function battle() {
    const [ enemyHp,setEnemyHp ] = useState(0);
    const [ maxEnemyHp,setMaxEnemyHp ] = useState(2);
    const [ enemyAttack,setEnemyAttack ] = useState(1);
        
    const [ playerHp,setPlayerHp ] = useState(15);
    const [ maxPlayerHp,setMaxPlayerHp ] = useState(15);
    const [ playerAttack,setPlayerAttack ] = useState(1);

    const [ curExp,setCurExp ] = useState(0);
    const [ maxExp,setMaxExp ] = useState(5);

    /* BattleSystem */
    useEffect(()=>{
        const battling = setInterval(()=>{
            setEnemyHp(prev=>prev-playerAttack);
            setPlayerHp(prev=>prev-enemyAttack);
        },500);

        return () => {
            clearInterval(battling);
        };
    },[]);

    /* BattleResult */
    useEffect(()=>{
        if(playerHp<1) return;

        if(enemyHp<1){
            setCurExp(prev=>prev+enemyAttack);
            setEnemyAttack(prev=>prev+1);
            setMaxEnemyHp(prev=>{
                const max = prev*1.1;
                setEnemyHp(Math.floor(max));
                return max;
            });
        }
    },[playerHp,enemyHp]);

    /* Level up */
    useEffect(()=>{
        if(maxExp > curExp) return;
        setCurExp(prev=>{
            return Math.floor(prev-maxExp);
        })
        setMaxExp(prev=>Math.ceil(prev*1.1));
        setPlayerHp(playerHp+5);
        setPlayerAttack(playerAttack+1);
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