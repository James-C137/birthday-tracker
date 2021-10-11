import React from 'react';
import './Sidebar.css';

// Libraries
import { motion } from 'framer-motion';

// Contexts
import { useSidebarContext } from '../../contexts/sidebar/sidebarContext';

// Components

const sidebarShadowVariants = {
  open: {opacity: 1, display: 'block' },
  closed: { opacity: 0, transitionEnd: {display: 'none'} },
}

const sidebarVariants = {
  open: { opacity: 1, x: 0, display: 'block' },
  closed: { opacity: 0, x: '-100%', transitionEnd: {display: 'none'} },
}

const Sidebar = () => {
  const { sidebarState, sidebarDispatch } = useSidebarContext();

  return (
    <div className="sidebar">
      <motion.div
        className="sidebar-shadow"
        animate={sidebarState.isOpen? 'open' : 'closed'}
        variants={sidebarShadowVariants}
        transition={{type: 'tween'}}
        initial={false}
        // onClick={() => {sidebarDispatch({type: 'TOGGLE_SIDEBAR'})}}
      />
      <motion.nav
        className="sidebar-content"
        animate={sidebarState.isOpen? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{type: 'tween'}}
        initial={false}
      >
        <div className="sidebar-close" onClick={() => {sidebarDispatch({type: 'TOGGLE_SIDEBAR'})}}>
          <i className="fas fa-times"/>
        </div>
      </motion.nav>
    </div>
  );
}

export default Sidebar;
