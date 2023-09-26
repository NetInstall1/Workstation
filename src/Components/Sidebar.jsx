import React from 'react';
import './Sidebar.css';
import 'font-awesome/css/font-awesome.min.css';

const Sidebar = () => {
  return (
    <nav id="sidebar" className="bg-light">
      <div className="p-4">
      <h4 className="text-center"><i className="fa fa-angle-double-right"></i></h4> {/* Use the Font Awesome icon */}
        <ul className="list-unstyled components">
          <li className="sidebar-option">Option 1</li>
          <li className="sidebar-option">Option 2</li>
          <li className="sidebar-option">Option 3</li>
          <li className="sidebar-option">Option 4</li>
          <li className="sidebar-option">Option 5</li>
          <li className="sidebar-option">Option 6</li>
          <li className="sidebar-option">Option 7</li>
          {/* Add more options as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
