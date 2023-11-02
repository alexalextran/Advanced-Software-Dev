import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import styles from '../styles/openai.module.scss';

const CircularProgressBar = ({ label, value, color }) => {
  return (
    <div className={styles.stats}>
      <h3>{label}</h3>
      <CircularProgressbar
        value={parseFloat(value) || 0}
        text={`${value || 0}`}
        styles={buildStyles({
          strokeLinecap: 'butt',
          transition: 'stroke-dashoffset 10s ease 10s',
          pathColor: color,
          textColor: 'white',
          trailColor: 'black',
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
