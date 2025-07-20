import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Liste des événements filtrés selon le type sélectionné
  const eventsFiltered = !type
    ? data?.events || []
    : (data?.events || []).filter(event => event.type === type);

  // Nombres de pages total
  const totalPages = Math.ceil(eventsFiltered.length / PER_PAGE);

  // Index de pagination
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const eventsOnPage = eventsFiltered.slice(startIndex, endIndex);

  // Gérer le changement de type (filtre)
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // Générer la liste des types d'événements
  const typeList = data?.events ? Array.from(new Set(data.events.map(event => event.type))) : [];

  return (
    <>
      {error && <div>An error occured</div>}
      {!data
        ? <div>loading...</div>
        : (
          <>
            <h3 className="SelectTitle">Catégories</h3>
            <Select
              selection={typeList}
              onChange={value => value ? changeType(value) : changeType(null)}
            />
            <div id="events" className="ListContainer">
              {eventsOnPage.map(event => (
                <Modal key={event.id} Content={<ModalEvent event={event} />}>
                  {({ setIsOpened }) => (
                    <EventCard
                      onClick={() => setIsOpened(true)}
                      imageSrc={event.cover}
                      title={event.title}
                      date={new Date(event.date)}
                      label={event.type}
                    />
                  )}
                </Modal>
              ))}
            </div>
            <div className="Pagination">
              {Array.from({ length: totalPages }).map((_, n) => (
                <a
               key={`page-${n + 1}`}
                  href="#events"
                  className={n + 1 === currentPage ? "active" : ""}
                  onClick={() => setCurrentPage(n + 1)}
                >
                  {n + 1}
                </a>
              ))}
            </div>
          </>
        )
      }
    </>
  );
};

export default EventList;