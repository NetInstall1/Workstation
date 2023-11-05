import React from 'react';
import '../styles/SystemInfoCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SystemInfoCard = ({ title, value, icon }) => {
  return (
    <div className="system-info-card">
      <div className="system-info-header">
        <FontAwesomeIcon icon={icon} size="3x" className="system-info-icon" />
        <div className="system-info-title">{title}</div>
      </div>
      <div className="system-info-value">{value}</div>
    </div>
  );
};

export default SystemInfoCard;