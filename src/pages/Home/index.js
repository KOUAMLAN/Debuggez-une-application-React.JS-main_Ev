import React from "react";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";
import Footer from "../../components/Footer";
import { useData } from "../../contexts/DataContext";
import "./style.scss";

const Home = () => {
  const { data, last } = useData();

  if (!data) return <p>Chargement...</p>;

  return (
    <main className="Home">
      <h2 id="realisationTitle">Nos réalisations</h2>

      {/* 🔧 Section événements avec data-testid */}
      <section data-testid="events-list">
        {data.events.map((event) => (
          <EventCard
            key={event.id}
            imageSrc={event.cover}
            imageAlt={event.title}
            title={event.title}
            label={event.type}
            date={new Date(event.date)}
            data-testid="event-card"
          />
        ))}
      </section>

      {/* 🔧 PeopleCard avec prop 'role' */}
      <PeopleCard name="Samira" role="CEO" imageSrc="/images/stephanie.png" />

      <Footer />
    </main>
  );
};

export default Home;