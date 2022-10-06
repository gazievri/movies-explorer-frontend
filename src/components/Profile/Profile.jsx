import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { REGEXP_EMAIL, REGEXP_NAME } from "../../utils/constants";

const Profile = ({ handleLogout,
  handleUpdateUserData,
  errorMesage,
  setErrorMessage,
  isDisabledEditProfile,
  setIsDisabledEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);


  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    mode: "all",
  });

  const watchAllFields = watch();

  const handleCLickLogout = () => {
    handleLogout();
  };

  const handleClickEdit = () => {
    setIsDisabledEditProfile(!isDisabledEditProfile);
    setErrorMessage('')
  };

  const onSubmit = (data) => {

    handleUpdateUserData(data);

    if(errorMesage) {
      setIsDisabledEditProfile(!isDisabledEditProfile);
    }

  };

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("email", currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    setErrorMessage('')
  }, [watch])

  return (
    <form className="profile" onSubmit={handleSubmit(onSubmit)}>
      <h2>Привет, {currentUser.name}!</h2>
      <div className="profile__user">
        <p className="profile__title">Имя</p>
        <input
          className="profile__value"
          disabled={isDisabledEditProfile ? "" : "disabled"}
          type="text"
          {...register("name", {
            required: "Это поле обязазательно для заполнения",
            minLength: {
              value: 2,
              message: "Имя должно состоять минимум из двух букв",
            },
            maxLength: {
              value: 30,
              message: "Имя должно состоять не более чем из 30 букв",
            },
            pattern: {
              value: REGEXP_NAME,
              message: "Поле может содержать буквы, тире или пробелы",
            },
          })}
        />
      </div>
      <div className="profile__email">
        <p className="profile__title">E-mail</p>
        <input
          className="profile__value"
          type="email"
      
          disabled={isDisabledEditProfile ? "" : "disabled"}
          {...register("email", {
            required: "Это поле обязазательно для заполнения",
            pattern: {
              value: REGEXP_EMAIL,
              message: "Здесь должен быть корректный e-mail",
            },
          })}
        />
      </div>

      {!isDisabledEditProfile ? (
        <>
          <button
            className="profile__edit"
            type="button"
            onClick={handleClickEdit}
          >
            Редактировать
          </button>
          <button
            className="profile__logout"
            type="button"
            onClick={handleCLickLogout}
          >
            Выйти из аккаунта
          </button>
        </>
      ) : (
        <>
          <span
            className={`profile__server-error ${
              errorMesage ? "profile__server-error_active" : ""
            }`}
          >
            {errorMesage ? errorMesage : "1"}
          </span>
          <button
            className={`profile__save-btn ${
              !isValid || errorMesage ? "profile__save-btn_disabled" : ""
            }`}
            type="submit"
          >
            Сохранить
          </button>
        </>
      )}
    </form>
  );
};

export default Profile;
