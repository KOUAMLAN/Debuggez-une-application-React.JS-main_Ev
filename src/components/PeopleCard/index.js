import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const PeopleCard = ({ name, position, imageSrc }) => (
  <div className="PeopleCard">
    <img
      src={imageSrc}
      alt={name} // alt dynamique basé sur "name"
      data-testid="card-image-testid"
      className="PeopleCard__image"
    />
    <div data-testid="people-name" className="PeopleCard__name">{name}</div>
    <div data-testid="people-position" className="PeopleCard__position">{position}</div>
  </div>
);

PeopleCard.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default PeopleCard;