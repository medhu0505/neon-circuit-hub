import { SkySection } from "./SkySection";
import { EventsCityMap } from "./EventsCityMap";
import { AboutSection } from "./AboutSection";
import { CrystalTeamSection } from "./CrystalTeamSection";
import { TrafficFaqSection } from "./TrafficFaqSection";
import { PlazaSection } from "./PlazaSection";

/**
 * The homepage as one continuous descent: night sky → city of events (2D map)
 * → what Quantum is → crystal atrium (team) → traffic lanes (FAQ) → plaza.
 */
export function CyberCityJourney() {
  return (
    <>
      <SkySection />
      <EventsCityMap />
      <AboutSection />
      <CrystalTeamSection />
      <TrafficFaqSection />
      <PlazaSection />
    </>
  );
}

