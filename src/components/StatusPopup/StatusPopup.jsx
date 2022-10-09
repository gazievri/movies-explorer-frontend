import './StatusPopup.css';
import Logo from '../Logo/Logo';

const StatusPopup = ({ isLoggedIn, isStatusPopupOpened }) => {

  return (
    <div className={`statuspopup ${isStatusPopupOpened ? 'statuspopup_status_opened' : ''}`}>
      <div className='statuspopup__container'>
        <h2 className='statuspopup__status'>Профиль успешо обновлен</h2>
      </div>
    </div>

  )
}

export default StatusPopup;
