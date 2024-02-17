import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Popup from '../../components/Popup/Popup';
import FounderBioSection from '../../components/Home/FounderBioSection';
import FooterSection from '../../components/Home/FooterSection';
import styles from './Home.module.css';
import SlideshowTwo from '../../components/Slideshow/SlideshowTwo';
import HeaderSection from '../../components/Home/HeaderSection';
import CategoriesTitle from '../../components/Home/CategoriesTitle';
import Card from '../../components/UI/Card';
import ProductCategories from '../../components/Home/ProductCategories';
import Infomercial from '../../components/Video/Infomercial';
import Slideshow from '../../components/Slideshow/Slideshow';
import ContactInfo from '../../components/Home/ContactInfo';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto; /* Center the container horizontally */
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 3rem;
`;

const LeftPane = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RightPane = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!Cookies.get('formSubmitted')) {
        setShowPopup(true);
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const overlayClasses = showPopup ? styles.overlay : '';

  return (
    <>
      <div className={overlayClasses}></div>
      {showPopup && <Popup onClose={closePopup} />}
      <Container>
        <HeaderContainer className={styles.headerContainer}>
          <LeftPane className={styles.leftPane}>
            <HeaderSection />
            <Card className={styles.homeCard}>
              <ContactInfo />
              <CategoriesTitle />
              <ProductCategories />
            </Card>
            <Infomercial />
            <Slideshow />
          </LeftPane>
          <RightPane>
            <FounderBioSection />
          </RightPane>
        </HeaderContainer>
        <SlideshowTwo />
        <FooterSection />
      </Container>
    </>
  );
};

export default HomePage;
