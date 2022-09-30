import './Profile.css';

const Profile = ({ handleLogout }) => {

  const handleCLickLogout = () => {
    handleLogout()
  }

  return (
    <div className='profile'>
      <h2>Привет, Руслан!</h2>
      <div className='profile__user'>
        <p className='profile__title'>Имя</p>
        <p className='profile__value'>Руслан</p>
      </div>
      <div className='profile__email'>
        <p className='profile__title'>E-mail</p>
        <p className='profile__value'>grinrus@yandex.ru</p>
      </div>
      <button className='profile__edit' type='button'>Редактировать</button>
      <button className='profile__logout' type='button' onClick={handleCLickLogout}>Выйти из аккаунта</button>
    </div>
  )
}

export default Profile;
