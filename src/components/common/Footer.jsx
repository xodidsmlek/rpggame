import { useState,useEffect } from 'react'
import '../../assets/styles/css/Footer.css'

function Footer({menu,setMenu}) {
    const menuButton = () => {
        switch (menu){
            case "main":
                return (
                    <>
                        <button onClick={() => setMenu("move")}>이동</button>
                        <button onClick={() => setMenu("status")}>상태</button>
                    </>
                );
            case "move":
                return(
                    <>
                        <button onClick={() => setMenu("battle")}   >탑 도전</button>
                        <button onClick={() => setMenu("main")}     >뒤로</button>
                    </>
                );
            case "status":
                return(
                    <>
                        <button onClick={() => setMenu("ability")}  >능력치</button>
                        <button onClick={() => setMenu("skill")}    >스킬</button>
                        <button onClick={() => setMenu("main")}     >뒤로</button>
                    </>
                );
            case "ability":
                return(
                    <>
                        <button onClick={() => setMenu("status")}   >뒤로</button>
                        <button onClick={() => setMenu("main")}     >처음</button>
                    </>
                );
            case "skill":
                return(
                    <>
                        <button onClick={() => setMenu("status")}   >뒤로</button>
                        <button onClick={() => setMenu("main")}     >처음</button>
                    </>
                );
            
            default :
                return null;
        }
    };

    return(
        <>
            <footer>
                {menuButton()}
            </footer>
        </>
    )
}

export default Footer