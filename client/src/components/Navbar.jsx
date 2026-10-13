import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, dashboardPath } from '../context/AuthContext.jsx';
import { LogoMark } from './Icons.jsx';

export function Brand({ onClick }) {
  return (
    <Link to="/" className="brand" onClick={onClick} aria-label="FoodShare home">
      <LogoMark />
      <span>FOODSHARE</span>
    </Link>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    close();
    navigate('/');
  };

  // Transparent over the home hero, solid once scrolled or on other pages
  const solid = scrolled || open || pathname !== '/';

  return (
    <header className={`navbar ${solid ? 'solid' : ''}`}>
      <div className="container navbar-inner">
        <Brand onClick={close} />

        <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
        </button>

        <div className={`nav-menu ${open ? 'open' : ''}`}>
          <nav className="nav-links">
            <NavLink to="/browse" onClick={close}>Find food</NavLink>
            {(!user || user.role === 'donor') && (
              <NavLink to={user ? '/donate' : '/register?role=donor'} onClick={close}>Donate</NavLink>
            )}
            {user && (
              <NavLink to={dashboardPath(user)} onClick={close}>
                {user.role === 'admin' ? 'Admin' : 'Dashboard'}
              </NavLink>
            )}
          </nav>

          <div className="nav-actions">
            {user ? (
              <>
                <NavLink to="/profile" className="nav-user" onClick={close} title="Your profile">
                  <span className="avatar">{user.name[0]?.toUpperCase()}</span>
                  <span className="nav-user-name">{user.name.split(' ')[0]}</span>
                </NavLink>
                <button className="btn btn-primary btn-sm" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-plain" onClick={close}>Log in</NavLink>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={close}>Get started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
