import cn from "classnames";
import { useState } from "react";
import s from "./index.module.css"

export const Accordion = ({children, title}) => {
    const [selected, setSelected] = useState(false);

    const toggleState = () => {
        setSelected((state) => !state);
    };
    return (
        <div className={cn(s.accordion, { [s.active]: selected })}>
            <button className={s.accordionButton} onClick={()=>toggleState()}>
                <p className={s.title}>{title}</p>
            </button>
            <div className={s.content}>
                <p className={s.text}>{children}</p>
            </div>
        </div>
    )
}

// Компонент принимает два аргумента:  children - содержимое блока, title -  заголовок
//Компонент использует хук useState, чтобы отслеживать, свернут ли блок в данный момент или нет. 
// Затем он отображает кнопку, функция toggleState(), которая меняет состояние блока на противоположное. 
//В зависимости от состояния блока, компонент применяет класс CSS "active" к корневому элементу блока, чтобы отобразить его как развернутый или свернутый. 
//Наконец, компонент отображает содержимое блока в зависимости от состояния блока.