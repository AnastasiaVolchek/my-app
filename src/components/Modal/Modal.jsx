import cn from "classnames";
import "./index.css";

export const Modal = ({ activeModal, children, setShowModal }) => {


    return (
        <>
            <div className={cn("modal", { ["active"]: activeModal })}
                onClick={() => setShowModal(false)}
                >
                <div className={cn("modal_content", { ["active"]: activeModal })} 
                onClick={(e) => e.stopPropagation()}>{children}
                </div>
            </div>
        </>
    )
}

// возвращает элементы, которые отображают модальное окно.
//classnames позволяет  задавать классы элементам в зависимости от условий.
//"modal" - имя класса, { ["active"]: activeModal } - объект, который добавляет класс "active", если значение activeModal - тру.
//stopPropagation - чтобы клики на элементе div не приводили к закрытию окна.