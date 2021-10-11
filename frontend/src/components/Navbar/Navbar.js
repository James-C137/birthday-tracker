import './Navbar.css'

// Contexts
import { useSidebarContext } from '../../contexts/sidebar/sidebarContext';

const Navbar = () => {
  const { sidebarDispatch } = useSidebarContext();

  return (
    <div className="navbar">
      <i className="fas fa-bars" onClick={() => {sidebarDispatch({type: 'TOGGLE_SIDEBAR'})}}/>
      <i className="fas fa-cog" />
    </div>
  );
}

export default Navbar;
