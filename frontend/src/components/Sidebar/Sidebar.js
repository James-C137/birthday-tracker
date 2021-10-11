import React from 'react';
import './Sidebar.css';

// Libraries
import { motion } from 'framer-motion';

// Contexts
import { useSidebarContext } from '../../contexts/sidebar/sidebarContext';

// Components

const sidebarShadowVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
}

const sidebarVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
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
        // onClick={() => {sidebarDispatch({type: 'TOGGLE_SIDEBAR'})}}
      />
      <motion.nav
        className="sidebar-content"
        animate={sidebarState.isOpen? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{type: 'tween'}}
      >
        <div className="sidebar-close" onClick={() => {sidebarDispatch({type: 'TOGGLE_SIDEBAR'})}}>
          <i className="fas fa-times"/>
        </div>
      </motion.nav>
    </div>
  );
}

export default Sidebar;
