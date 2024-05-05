import './Landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {

  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-text">
        <p className='first-title'>Find all about <b style={{color: '#C70039'}}>soccer!</b></p>
        <p className='second-title'>Plays and analytics</p>
        <button className='btn-getstarted' onClick={() => navigate('/plays')}>Get started</button>
      </div>

    </div>
  );
}

export default Landing;