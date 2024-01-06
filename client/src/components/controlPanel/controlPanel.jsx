import React from 'react';
import styles from './controlPanel.module.scss';

const controlPanel = (props) => {
  const { file, pageNumber, numPages, setPageNumber, scale, setScale } = props;

  const onPageChange = (e) => {
    const { value } = e.target;
    setPageNumber(Number(value));
  };

  return (
    <div className={styles.control-panel}>
      <div className={styles.d-flex}>
        <span>
          Page{' '}
          <input
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            className={styles.input}
            value={pageNumber}
            onChange={onPageChange}
          />{' '}
          of {numPages}
        </span>
      </div>
    </div>
  );
};

export default controlPanel;
