import { events } from "@/lib/events";
import tower1 from "@/assets/tower-1.png.asset.json";
import tower2 from "@/assets/tower-2.png.asset.json";
import tower3 from "@/assets/tower-3.png.asset.json";
import tower4 from "@/assets/tower-4.png.asset.json";
import tower5 from "@/assets/tower-5.png.asset.json";
import tower6 from "@/assets/tower-6.png.asset.json";

/**
 * Single source of truth for the city → event mapping.
 *
 * Each entry is one real tower cutout (transparent PNG) placed along the
 * skyline as a percentage box. Reordering this array reorders the scroll story
 * without touching any animation logic — segments derive from the length.
 */
export type BuildingSpec = {
  /** index into `events` */
  event: number;
  /** CDN url of the tower cutout */
  src: string;
  /** horizontal centre of the tower on the skyline, % */
  left: number;
  /** tower width relative to the stage, % */
  width: number;
  /** how tall the tower stands relative to the stage height, 0-1 */
  height: number;
  tone: string;
  /** per-building float offset so they never bob in unison */
  phase: number;
};

export const BUILDINGS: BuildingSpec[] = [
  { event: 0, src: tower3.url, left: 11, width: 13, height: 0.88, tone: "#38bdf8", phase: 0 },
  { event: 1, src: tower1.url, left: 27, width: 15, height: 1, tone: "#e879f9", phase: 0.9 },
  { event: 2, src: tower5.url, left: 43, width: 11, height: 0.76, tone: "#22d3ee", phase: 1.8 },
  { event: 3, src: tower4.url, left: 58, width: 13, height: 0.96, tone: "#c084fc", phase: 2.7 },
  { event: 4, src: tower2.url, left: 73, width: 12, height: 0.9, tone: "#a855f7", phase: 3.6 },
  { event: 5, src: tower6.url, left: 88, width: 11, height: 0.82, tone: "#f0abfc", phase: 4.5 },
];

/** Scroll runway before the first building and after the last one. */
const LEAD_IN = 0.1;
const LEAD_OUT = 0.08;

export type Segment = { start: number; end: number };

/** Normalised [0,1] scroll segment owned by each building. */
export const SEGMENTS: Segment[] = BUILDINGS.map((_, i) => {
  const span = (1 - LEAD_IN - LEAD_OUT) / BUILDINGS.length;
  const start = LEAD_IN + i * span;
  return { start, end: start + span };
});

export const cityEvents = BUILDINGS.map((b) => events[b.event]!);
