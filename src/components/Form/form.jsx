import "./index.scss"
import cn from "classnames";

export const Form = ({submitForm, title, children, className}) => {
    return ( 
    <> 

    <form onSubmit={submitForm} className={cn("form", `${className ?? ""}`)}>
        <h1 className="form__title">{title}</h1>
        {children}
    </form>

    </>
    );
};

// Компонент возвращает Form, который содержит заголовок формы и дочерние элементы.
// Свойство onSubmit устанавливает функцию submitForm в качестве обработчика события отправки формы.
// Свойство className используется для задания доп классов для элемента form.
// Здесь используется оператор ??, который задает пустую строку в качестве значения по умолчанию, если значение className не определено.
// Заголовок формы задается в элементе h1 с классом "form__title". 
// Дочерние элементы передаются через параметр children.