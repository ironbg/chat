import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Brand values taken from nolina-med.eu: Elementor globals (primary #2E3543, accent #AABE30,
// #D7E09E, #879B10), the orange figure in the logo (#E16501) and the site font, Rubik.
export const C = {
  night: "#1a2029",
  ink: "#232b38",
  slate: "#2e3543",
  steel: "#3d4556",
  grey: "#69717a",
  lime: "#aabe30",
  limeSoft: "#d7e09e",
  limeDark: "#879b10",
  orange: "#e16501",
  paper: "#f8f8f8",
};

const RUBIK_CYR = "U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116";
const RUBIK_LAT = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
for (const [subset, range] of [["cyrillic", RUBIK_CYR], ["latin", RUBIK_LAT]] as const) {
  for (const style of ["normal", "italic"] as const) {
    loadFont({
      family: "Rubik",
      url: staticFile(`nolina/fonts/rubik-${subset}-wght-${style}.woff2`),
      weight: "300 900",
      style,
      unicodeRange: range,
    });
  }
}

export const display = "Rubik, sans-serif";
export const text = "Rubik, sans-serif";
