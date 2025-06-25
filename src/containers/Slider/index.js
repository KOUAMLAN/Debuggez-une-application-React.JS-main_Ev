import { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  // On fait une copie pour trier sans modifier la source
  const byDateDesc = [...(data?.focus || [])].sort(
    (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)
  );

  useEffect(() => {
    // Nettoyage du timeout précédent
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Lancer le changement automatique
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    // Nettoyage à la destruction
    return () => clearTimeout(timeoutRef.current);
  }, [index, byDateDesc.length]);

  // Gestion du clic sur la pagination
  const handlePaginationClick = (idx) => setIndex(idx);

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.id || event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title} />
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
          {byDateDesc.map((_, radioIdx) => (
            <input
              key={radioIdx}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handlePaginationClick(radioIdx)}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;