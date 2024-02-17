import styles from './ContactInfo.module.css';

const ContactInfo = () => {
  return (
    <section className={styles['contact-info']}>
      <div
        className={styles['phone-number']}
        type="tel"
      >
        <i className="material-icons">call</i>
        <p>(201) 662-7878</p>
      </div>
      <a
        className={styles.email}
        href="mailto:info@libertynutritionsystem.com"
        target="_blank"
        rel="noreferrer"
      >
        <i className="material-icons">mail</i>
        <p>info@libertynutritionsystem.com</p>
      </a>
    </section>
  );
};

export default ContactInfo;
