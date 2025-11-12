import { useState,useEffect,useRef, use } from "react";

function battle() {
    /* 상태 */
    const [ enemyAttack,setEnemyAttack ] = useState(1);
    const [ maxEnemyHp,setMaxEnemyHp ] = useState(3);
    const [ enemyHp,setEnemyHp ] = useState(maxEnemyHp);
        
    const [ playerAttack,setPlayerAttack ] = useState(1);
    const [ maxPlayerHp,setMaxPlayerHp ] = useState(40);
    const [ playerHp,setPlayerHp ] = useState(maxPlayerHp);

    const [ curExp,setCurExp ] = useState(0);
    const [ maxExp,setMaxExp ] = useState(5);

    const [ skill,setSkill ] = useState("빈틈을 노리는 중");

    /* 참조 */
    const playerAttackRef = useRef(playerAttack);
    const enemyAttackRef = useRef(enemyAttack);
    const maxPlayerHpRef = useRef(maxPlayerHp);
    const maxEnemyHpRef = useRef(maxEnemyHp);
    const playerHpRef = useRef(playerHp);
    const enemyHpRef = useRef(enemyHp);
    const curExpRef = useRef(curExp);
    const maxExpRef = useRef(maxExp);
    const battlingRef = useRef(null);

    useEffect(()=>{playerAttackRef.current = playerAttack;},[playerAttack]);
    useEffect(()=>{enemyAttackRef.current = enemyAttack;},[enemyAttack]);
    useEffect(()=>{maxPlayerHpRef.current = maxPlayerHp;},[maxPlayerHp]);
    useEffect(()=>{maxEnemyHpRef.current = maxEnemyHp;},[maxEnemyHp]);  
    useEffect(()=>{playerHpRef.current = playerHp;},[playerHp]);
    useEffect(()=>{enemyHpRef.current = enemyHp;},[enemyHp]);
    useEffect(()=>{curExpRef.current = curExp;},[curExp]);
    useEffect(()=>{maxExpRef.current = maxExp;},[maxExp]);

    /* Skill */
    const useSkill = () => {
        if(playerHpRef.current<1){
            setSkill("패배...");
            window.removeEventListener('keydown',keyDown);
            return;
        }
            
        if(Math.ceil(Math.random()*100)>111)return;
        const keySet = Math.floor(Math.random()*26);
        const keyDown =(e)=>{
            if(e.code === 'Key'+String.fromCharCode(65+keySet)){
                setEnemyHp(prev=>prev-playerAttackRef.current*3);
                setSkill("빈틈을 노리는 중");
                window.removeEventListener('keydown',keyDown);
            }else{
                setSkill("실패! 역공을 당했다!");
                setPlayerHp(prev=>prev-enemyAttackRef.current);
                window.removeEventListener('keydown',keyDown);
            }
        };
        window.addEventListener('keydown',keyDown);
        setSkill("빈틈의 실! ("+String.fromCharCode(65+keySet)+")");
    };

    /* BattleSystem */
    useEffect(()=>{
        battlingRef.current = setInterval(()=>{
            setEnemyHp(prev=>prev-playerAttackRef.current);
            setPlayerHp(prev=>{
                const hp = prev-enemyAttackRef.current;
                playerHpRef.current = hp;
                useSkill();
                return hp;  
            });
            
        },1000);

        return () => {
            clearInterval(battlingRef.current);
        };
    },[]);

    /* BattleResult */
    useEffect(()=>{
        if(enemyHp<1){
            setCurExp(prev=>prev+enemyAttack);
            setEnemyAttack(prev=>prev+1);
            setMaxEnemyHp(prev=>{
                const max = prev*1.1;
                setEnemyHp(Math.floor(max));
                return max;
            });
            return;    
        }
        if(playerHp<1) {
            clearInterval(battlingRef.current); 
            return;
        };
    },[playerHp,enemyHp]);

    /* Level up */
    useEffect(()=>{
        if(maxExp > curExp) return;
        const oldMaxExp = maxExp
        setCurExp(prev=>Math.floor(prev-oldMaxExp));
        setMaxExp(prev=>Math.ceil(prev*1.1));
        setPlayerHp(prev=>prev+5);
        setMaxPlayerHp(prev=>prev+5);
        setPlayerAttack(prev=>prev+1);
    },[curExp]);

    return(
        <>
            <div>적 HP : {enemyHp} / {Math.floor(maxEnemyHp)}</div>
            <div>HP : {playerHp} / {Math.floor(maxPlayerHp)}</div>
            <div>현재 경험치 : {curExp}/{Math.floor(maxExp)}</div>
            <div>{skill}</div>
        </>
    )
}

export default battle