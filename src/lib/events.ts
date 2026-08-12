import { Brain, Clapperboard, Megaphone, HelpCircle, Gamepad2, Presentation } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type EventItem = {
  slug: string;
  name: string;
  title: string;
  category: string;
  format: string;
  teamSize: string;
  short: string;
  description: string;
  rules: string[];
  slot: string;
  eligibility: string;
  icon: LucideIcon;
};

export const events: EventItem[] = [
  {
    slug: "quiz",
    name: "quiz",
    title: "Quiz",
    category: "Sports & Pop Culture",
    format: "solo or team",
    teamSize: "1-2 players",
    short: "Rapid-fire trivia across sports, music, film and internet culture.",
    description:
      "A rapid-fire trivia gauntlet spanning sports history, pop culture, music and the internet's greatest hits. Written prelims narrow the field, then the top finalists go head-to-head on the main stage with buzzers, negative marking and a lightning round finish.",
    rules: [
      "Placeholder: written prelims decide the six finalists.",
      "Placeholder: buzzer round carries negative marking.",
      "Placeholder: no phones, notes or external help on the floor.",
      "Placeholder: quizmaster's decision is final.",
    ],
    slot: "Slot TBC — placeholder: morning session, ~90 minutes.",
    eligibility: "Placeholder: open to all participating schools, grades 8-12.",
    icon: Brain,
  },
  {
    slug: "film-making",
    name: "film_making",
    title: "Film Making",
    category: "Short-form video",
    format: "team",
    teamSize: "3-5 members",
    short: "Shoot, cut and deliver a short film against a same-day brief.",
    description:
      "Teams receive a theme on the day and have a fixed window to script, shoot and edit a short film. Judging weighs storytelling and originality over gear — a phone camera and a sharp idea beats a rig with nothing to say.",
    rules: [
      "Placeholder: all footage must be shot during the event window.",
      "Placeholder: runtime capped at 5 minutes including credits.",
      "Placeholder: licensed or original audio only.",
      "Placeholder: teams bring their own cameras and editing devices.",
    ],
    slot: "Slot TBC — placeholder: full-day challenge, submission by evening.",
    eligibility: "Placeholder: one team per school, grades 9-12.",
    icon: Clapperboard,
  },
  {
    slug: "ad-shoot",
    name: "ad_shoot",
    title: "Ad Shoot",
    category: "Campaign & pitch",
    format: "team",
    teamSize: "2-4 members",
    short: "Build a mock ad campaign for a surprise product, then pitch it.",
    description:
      "Teams are handed a fictional product and must build a campaign around it — concept, tagline, a short spot and a live pitch to the panel. Points for insight, craft and the nerve to sell it.",
    rules: [
      "Placeholder: product brief revealed at the start of the slot.",
      "Placeholder: 60-second maximum ad spot.",
      "Placeholder: 3-minute live pitch to judges.",
      "Placeholder: no pre-produced assets.",
    ],
    slot: "Slot TBC — placeholder: afternoon session, ~3 hours.",
    eligibility: "Placeholder: open to all participating schools.",
    icon: Megaphone,
  },
  {
    slug: "surprise",
    name: "surprise",
    title: "Surprise",
    category: "Mystery challenge",
    format: "revealed day-of",
    teamSize: "TBC",
    short: "A mystery event. Format and brief revealed on the day.",
    description:
      "The wildcard. Nobody knows the brief until the envelope opens on event day — it could be hands-on, on-stage or entirely off-script. Bring adaptability; that is the only preparation that works here.",
    rules: [
      "Placeholder: full rules announced at the reveal.",
      "Placeholder: teams must register in advance to hold a slot.",
      "Placeholder: all materials provided on site.",
      "Placeholder: judges' interpretation of the brief is final.",
    ],
    slot: "Slot TBC — placeholder: revealed on event day.",
    eligibility: "Placeholder: open to all registered participants.",
    icon: HelpCircle,
  },
  {
    slug: "online-gaming",
    name: "online_gaming",
    title: "Online Gaming",
    category: "Competitive bracket",
    format: "solo or squad",
    teamSize: "1 or squad of 4",
    short: "Knockout bracket across a solo title and a squad title.",
    description:
      "A straight knockout bracket run across a solo title and a squad title. Seeded qualifiers in the morning, best-of-three from the quarter-finals, with the grand final projected on the main screen.",
    rules: [
      "Placeholder: titles announced one week before the event.",
      "Placeholder: peripherals allowed, machines provided.",
      "Placeholder: any cheat software means instant disqualification.",
      "Placeholder: no-shows forfeit after a 5-minute grace period.",
    ],
    slot: "Slot TBC — placeholder: qualifiers morning, finals evening.",
    eligibility: "Placeholder: age-appropriate titles only; grades 8-12.",
    icon: Gamepad2,
  },
  {
    slug: "pitch",
    name: "pitch",
    title: "Pitch",
    category: "Idea & product",
    format: "team",
    teamSize: "2-3 members",
    short: "Pitch an idea or product to a panel and defend it under fire.",
    description:
      "Teams present an original idea, product or venture to a panel of judges — problem, solution, market and a demo if you have one — then defend it through a live Q&A round.",
    rules: [
      "Placeholder: 5-minute pitch plus 3-minute Q&A.",
      "Placeholder: slides optional, prototypes encouraged.",
      "Placeholder: ideas must be the team's own work.",
      "Placeholder: judging on originality, feasibility and delivery.",
    ],
    slot: "Slot TBC — placeholder: late afternoon session.",
    eligibility: "Placeholder: open to all participating schools.",
    icon: Presentation,
  },
];

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
