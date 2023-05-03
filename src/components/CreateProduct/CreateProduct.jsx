import { useForm } from "react-hook-form";
import { Form } from "../Form/form";
import "./index.scss"
import { BaseButton } from "../BaseButton/BaseButton";
import { api } from "../../utils/api";

export const CreateProduct = ({setCreateModal}) => {
    const {
        register, 
        handleSubmit, 
        formState: {errors} 
        } = useForm({mode: "onSubmit"}); 

        //Создание нового продукта 
    const CreateProduct = async (data) => {
        console.log(data)
        try {
            await api.addProduct(data)
        } catch (error) {
            console.log(error)
            alert("Ошибка. Проверьте правильность введенных данных")
        }
    }

    return <div className="create-product">
        <span className="closeModal" onClick={()=>setCreateModal(false)}>X</span>
    <div>
        <Form title={"Создать новый продукт"} submitForm={handleSubmit(CreateProduct)}>
        <input type="text" className="auth__input" placeholder="name" {...register("name", {required: true})}></input>
            <input type="number" className="auth__input" placeholder="price" {...register("price", {required: true})}></input>
            <input type="text" className="auth__input" placeholder="description" {...register("description")}></input>
            <input type="number" className="auth__input" placeholder="stock" {...register("stock")}></input>
            <input type="text" className="auth__input" placeholder="pictures" {...register("pictures")}></input>
            <input type="number" className="auth__input" placeholder="discount" {...register("discount")}></input>
            <div className="auth__actions">
                <BaseButton onClick={()=>setCreateModal(false)} color={"yellow"} type="submit">Отправить</BaseButton>
            </div>
        </Form>
    </div>
    </div>
}