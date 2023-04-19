import { createContext } from "react";

export const UserContext = createContext();


// export const UserContext = React.createContext();
//как работает Контекст:
// объявляем переменную с помощью createContext
// оборачиваем наше приложение в контекст провайдер
// с помощью пропса value помещаем помещаем любое значение в контекст провайдер
// проводим это значение в любом компоненте через context consumer
