import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='pagenotfound'>
      <h2 className='pagenotfound__title'>404</h2>
      <p className='pagenotfound__subtitle'>Страница не найдена</p>
      <p className='pagenotfound__back' onClick={() => navigate(-1)}>Назад</p>
    </div>
  )
}

export default PageNotFound;
