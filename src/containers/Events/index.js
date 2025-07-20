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

  const eventsFiltered = !type
    ? data?.events || []
    : data?.events.filter(event => event.type === type) || [];

  const totalPages = Math.ceil(eventsFiltered.length / PER_PAGE);

  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const eventsOnPage = eventsFiltered.slice(startIndex, endIndex);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null
        ? "loading"
        : (
          <>
            <h3 className="SelectTitle">Catégories</h3>
            <Select
              selection={Array.from(typeList)}
              onChange={value => value ? changeType(value) : changeType(null)}
            />
            <div id="events" className="ListContainer">
              {eventsOnPage.map((event) => (
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
              {[...Array(totalPages)].map((_, n) => (
                <a
                  key={n}
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

