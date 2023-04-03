import { useState } from "react";
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