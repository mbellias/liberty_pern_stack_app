import styles from './Infomercial.module.css';

const Infomercial = () => {
  const videoUrl =
    'https://res.cloudinary.com/dhnhzlu0g/video/upload/v1707334916/liberty-nutrition-system/water-filter-infomercial_wfsp88.mp4';

  return (
    <div className={styles.video}>
      <video
        controls
        autoPlay
        muted
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Infomercial;
