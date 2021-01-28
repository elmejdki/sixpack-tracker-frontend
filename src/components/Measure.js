import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import youtubeLogo from '../assets/images/youtube-logo.png';
import {
  container,
  measureImage,
  measureInfo,
  infoContainer,
  ytbLogoImage,
  ytbLink,
  measureTitle,
  unitContainer,
  link,
} from '../stylesheet/Measure.module.css';

const Measure = ({
  id, title, image, video, unit,
}) => (
  <div className={container}>
    <Link to={`/measures/edit/${id}`}>
      <img
        src={image}
        className={measureImage}
        alt="measure display"
      />
    </Link>
    <div className={measureInfo}>
      <Link to={`/measures/edit/${id}`} className={`${measureTitle} ${link}`}>
        {title}
      </Link>
      <div className={infoContainer}>
        <a
          href={video}
          target="_blank"
          rel="noreferrer"
          className={ytbLink}
        >
          <img
            src={youtubeLogo}
            alt="youtube Logo"
            className={ytbLogoImage}
          />
        </a>
        <div className={unitContainer}>
          unit: &nbsp;
          <span>{unit}</span>
        </div>
      </div>
    </div>
  </div>
);

Measure.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
};

export default Measure;
