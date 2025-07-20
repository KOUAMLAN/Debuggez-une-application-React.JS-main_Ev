import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const PeopleCard = ({ name, role, imageSrc }) => {
  return (
    <div className="PeopleCard">
      <div className="PeopleCard__imageContainer">
        <img src={imageSrc || ""} alt="" data-testid="card-image-testid" />
      </div>
      <div className="PeopleCard__descriptionContainer">
        <div className="PeopleCard__name">{name}</div>
        <div className="PeopleCard__position">{role}</div> {/* 👈 VERY IMPORTANT */}
      </div>
    </div>
  );
};

PeopleCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
};

PeopleCard.defaultProps = {
  imageSrc: "",
};

export default PeopleCard;
