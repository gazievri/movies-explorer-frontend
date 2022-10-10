import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { REGEXP_EMAIL, REGEXP_NAME } from "../../utils/constants";

const Profile = ({
  handleLogout,
  handleUpdateUserData,
  errorMesage,
  setErrorMessage,
  isDisabledEditProfile,
  setIsDisabledEditProfile,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [isDataTheSame, setIsDataTheSame] = useState(true);

  // Инициация формы через useForm
  const {
    register,
    formState: { isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    mode: "all"
  });

  // Обработка клика на выход из профиля
  const handleCLickLogout = () => {
    handleLogout();
  };

  // Обработка клика по кнопке Редактировать
  const handleClickEdit = () => {
    setIsDisabledEditProfile(!isDisabledEditProfile);
    setErrorMessage("");
  };

  // Обработка нажатия на кнопку Сохранить
  const onSubmit = (data) => {
    handleUpdateUserData(data);
    if (errorMesage) {
      setIsDisabledEditProfile(!isDisabledEditProfile);
    }
  };

  // Эффект отслеживает текущее значение полей формы и если текущие значения не совпадают с данными пользователя, то устанавливает стейт IsDataTheSame ложным
  useEffect(() => {
    const name = watch('name')
    console.log(name, '!')
    const email = watch('email')
    if (
      currentUser.name !== name ||
      currentUser.email !== email
    ) {
      setIsDataTheSame(false);
    } else {
      setIsDataTheSame(true);
    }
    console.log(currentUser.name === name)

  }, [currentUser, watch()])

console.log(isDataTheSame)

  // Эффект устанавливает значения полей по умолчанию из контекста текущего пользователя
  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("email", currentUser.email);
  }, [currentUser, setValue]);

  // Эффект очищает текст ошибки при любом изменении в полях, то есть отслеживаем изменения в полях после вывода ошибки
  useEffect(() => {
    setErrorMessage("");
  }, [watch, setErrorMessage]);

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
              !isValid || errorMesage || isDataTheSame
                ? "profile__save-btn_disabled"
                : ""
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
