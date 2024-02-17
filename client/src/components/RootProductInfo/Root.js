import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Banner from './Banner';
import Inquiry from './Inquiry';
import styles from './Root.module.css';

const Root = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const openInquiry = () => {
    setIsInquiryOpen(true);
  };

  const closeInquiry = () => {
    setIsInquiryOpen(false);
  };

  const overlayClasses = isInquiryOpen ? styles.overlay : '';

  return (
    <>
      <div className={styles.banner}>
        <div className={overlayClasses}></div>
        <Banner onOpenInquiry={openInquiry} />
        {isInquiryOpen && <Inquiry onClose={closeInquiry} />}
      </div>
      <Outlet />
    </>
  );
};

export default Root;
