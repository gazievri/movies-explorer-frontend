import './StatusPopup.css';
import Logo from '../Logo/Logo';

const StatusPopup = () => {
  return (
    <div className='statuspopup'>
      <div className='statuspopup__container'>
        <Logo />
        <h2 className='statuspopup__status'>Статус</h2>
        <p className='statuspopup__message'>Текст ошибки</p>
        <button className='statuspopup__button' type='button'>Попробовать еще раз</button>
      </div>



    </div>

  )
}

export default StatusPopup;
