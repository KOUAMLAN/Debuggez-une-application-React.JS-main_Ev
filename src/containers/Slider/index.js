import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri du plus ancien au plus récent
  const byDateAsc = data?.focus
    ? [...data.focus].sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date))
    : [];

  const dataLength = byDateAsc.length;

  useEffect(() => {
    if (dataLength === 0) return undefined; // Correction ESLint : toujours retourner quelque chose

    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex < dataLength - 1 ? prevIndex + 1 : 0));
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, dataLength]);

  if (dataLength === 0) return null;

  return (
    <div className="SlideCardList">
      {byDateAsc.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title || "forum"} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc.map((event, radioIdx) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
              aria-label={`Afficher la slide ${radioIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
