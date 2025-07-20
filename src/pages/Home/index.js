import React from "react";
import Menu from "../../containers/Menu";
import ServiceCard from "../../components/ServiceCard";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";
import "./style.scss";
import EventList from "../../containers/Events";
import Slider from "../../containers/Slider";
import Logo from "../../components/Logo";
import Icon from "../../components/Icon";
import Form from "../../containers/Form";
import Modal from "../../containers/Modal";
import ModalEvent from "../../containers/ModalEvent";
import { useData } from "../../contexts/DataContext";

const Page = () => {
  const { last } = useData();

  return (
    <>
      <header>
        <Menu />
      </header>

      <main>
        <section className="SliderContainer">
          <Slider />
        </section>

        <section id="ServicesContainer" className="ServicesContainer">
          <h2 className="Title">Nos services</h2>
          <p>Nous organisons des événements sur mesure partout dans le monde</p>
          <div className="ListContainer">
            <ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
              <h3>Soirée d’entreprise</h3>
              Une soirée d’entreprise vous permet de réunir vos équipes...
            </ServiceCard>
            <ServiceCard imageSrc="/images/hall-expo.png">
              <h3>Conférences</h3>
              Conférences sur mesure, tous formats.
            </ServiceCard>
            <ServiceCard imageSrc="/images/sophia-sideri-LFXMtUuAKK8-unsplash1.png">
              <h3>Expérience digitale</h3>
              Interactivité, immersion et innovation.
            </ServiceCard>
          </div>
        </section>

        <section id="EventsContainer" className="EventsContainer">
          <h2 className="Title" id="realisationTitle" data-testid="realisationTitle">
            Nos réalisations
          </h2>
          <section id="events" data-testid="events-list">
            <EventList />
          </section>
        </section>

        <section id="PeoplesContainer" className="PeoplesContainer">
          <h2 className="Title">Notre équipe</h2>
          <p>Une équipe d’experts dédiée à l&apos;organisation de vos événements</p>
          <div className="ListContainer">
            <PeopleCard imageSrc="/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png" name="Samira" position="CEO" />
            <PeopleCard imageSrc="/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png" name="Jean-baptiste" position="Directeur marketing" />
            <PeopleCard imageSrc="/images/christina-wocintechchat-com-SJvDxw0azqw-unsplash.png" name="Alice" position="CXO" />
            <PeopleCard imageSrc="/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.png" name="Luís" position="Animateur" />
            <PeopleCard imageSrc="/images/amy-hirschi-b3AYk8HKCl0-unsplash1.png" name="Christine" position="VP animation" />
            <PeopleCard imageSrc="/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.png" name="Isabelle" position="VP communication" />
          </div>
        </section>

        <div className="FormContainer" id="contact">
          <h2 className="Title">Contact</h2>
          <Modal
            Content={
              <div className="ModalMessage--success">
                <div>Message envoyé !</div>
                <p>
                  Merci pour votre message, nous tâcherons de vous répondre dans
                  les plus brefs délais.
                </p>
              </div>
            }
          >
            {({ setIsOpened }) => (
              <Form
                onSuccess={() => setIsOpened(true)}
                onError={() => null}
              />
            )}
          </Modal>
        </div>
      </main>

      <footer className="row" data-testid="footer">
        {last && (
          <div className="col presta">
            <h3>Notre dernière prestation</h3>
            <Modal Content={<ModalEvent event={last} />}>
              {({ setIsOpened }) => (
                <div data-testid="event-card">
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={last.cover}
                    title={last.title}
                    date={new Date(last.date)}
                    label={last.type}
                    small
                  />
                </div>
              )}
            </Modal>
          </div>
        )}
        <div className="col contact">
          <h3>Contactez-nous</h3>
          <address>45 avenue de la République, 75000 Paris</address>
          <div>01 23 45 67 89</div>
          <div>contact@77events.com</div>
          <div className="SocialIcons">
            <a href="https://www.twitch.tv/" target="_blank" rel="noreferrer" aria-label="Twitch">
              <Icon name="twitch" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Icon name="facebook" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter">
              <Icon name="twitter" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
              <Icon name="youtube" />
            </a>
          </div>
        </div>

        <div className="col description">
          <Logo size="large" />
          <p>
            Une agence événementielle propose des prestations spécialisées dans la conception
            et l&apos;organisation d&apos;événements festifs, culturels ou professionnels.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Page;