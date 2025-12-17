import styles from '../../styles/modules/ServiceCard.module.css';

const ServiceCard = ({ icon, title, description, features }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <i className={`bx ${icon}`}></i>
      </div>
      
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      <ul className={styles.features}>
        {features.map((feature, index) => (
          <li key={index}>
            <i className="bx bx-check"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;