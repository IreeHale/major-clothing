import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../context/user.context';
 import { signOutUser } from '../../routes/utils/firebase/firebase.utils.jsx';


const Navigation = () => {
  const { currentUser } = useContext(UserContext);


    return (
      <Fragment>
        <div className="navigation">
          <Link className='logo-container' to='/'>
            <CrwnLogo  className='logo' />
          </Link>
          <div className='links-container'>
            <Link className='nav-link' to='/Shop'>
                Shop  
            </Link>
            {
              currentUser ? (
                <span className='nav-link' onClick={signOutUser}> SIGN OUT </span>
                ) :  ( 
                  <Link className='nav-link' to='/auth'>
                    Sign-In
                  </Link>
                )
              }
          </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;