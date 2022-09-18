import './Logo.css';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/'>
      <div className='logo'></div>
    </Link>

  )
}

export default Logo;