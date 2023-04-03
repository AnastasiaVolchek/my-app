import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/userContext";
import { api } from "../../utils/api";
import { Form } from "../Form/form";
import InputBase from "../BaseInput/input";
import "./index.scss"
import { useForm } from "react-hook-form";
import { BaseButton } from "../BaseButton/BaseButton";
import { openNotification } from "../Notification/Notification";

export const Profile = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [isEdit, setIsEdit] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onSubmit" });

    const navigate = useNavigate();
    const handleChangeAvatar = async () => {
      await api.updateAvatar({ avatar: "https://get.wallhere.com/photo/food-love-heart-photography-blue-coffee-drink-circle-emotion-color-eye-hand-finger-computer-wallpaper-sweetness-human-body-organ-close-up-macro-photography-86555.jpg" })
    }

    const sendProfileData = async (data) => {
        console.log(data);
        try {
          const newUser = await api.updateUserInfo({name: data.name, about: data.about});
          console.log({newUser});
          setCurrentUser ({...newUser})
          openNotification("success", "Успешно", "Данные успешно изменены");
        } catch (error) {
          openNotification("error", "error", "Не удалось изменить данные");
        }
    }

    const required = {
        required: {
            value: true
        }
    }

    const sendAvatar = async (dataAvatar) => {
        console.log({dataAvatar})
        try {
            const newUser =  await api.updateAvatar({avatar: dataAvatar.avatar})
            setCurrentUser({...newUser})
          openNotification("success", "Успешно", "Аватар успешно изменен");
        } catch (error) {
          openNotification("error", "error", "Не удалось изменить данные");
        }
    }

    return <div className="profile">
        <div className="auth__info" onClick={() => navigate(-1)}> {"< "} Назад </div>
            <h1>
                Мои данные
            </h1>
        {currentUser?.name && currentUser?.about && (<>
        <Form submitForm={handleSubmit(sendProfileData)}>
            <div className="profile__user">
                <input {...register("name", required)} defaultValue={currentUser.name} className="auth__input" type="text" placeholder="name" />
                <input {...register("about", required)} defaultValue={currentUser.about} className="auth__input" placeholder="about" />
                <input {...register("email")} className="auth__input" disabled defaultValue={currentUser?.email} placeholder="email" />
                <input {...register("id")} className="auth__input" disabled defaultValue={currentUser?._id} placeholder="id" />
                <BaseButton type="submit" color={"yellow"} >Отправить</BaseButton>
            </div>
        </Form>

        <div className="profile__avatar">
        <Form submitForm={handleSubmit(sendAvatar)}>
            <div className="profile__user">
                <img className="profile__avatar-img" src={currentUser.avatar} alt="" />
                <input className="auth__input" {...register("avatar")} defaultValue={currentUser?.avatar} placeholder="avatar" />
            <BaseButton type="submit" color={"yellow"} >Отправить</BaseButton>
            </div>
        </Form>   
        </div>
        </>)}

    </div>
}



{/* {!isEdit ?
                    <> <span>{currentUser.name}</span> 
                    {" "} iconEdit </> :
                    <input className="auth__input" value={currentUser.name} onChange={() => { }} placeholder="name" />
                } */}