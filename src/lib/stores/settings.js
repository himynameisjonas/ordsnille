import { writable } from "svelte/store";
let colorBlindnessStart;

if (typeof localStorage !== "undefined") {
  colorBlindnessStart = JSON.parse(localStorage.getItem("colorBlindness")) || false;
} else {
  colorBlindnessStart = false;
}
export const colorBlindness = writable(true);

if (typeof localStorage !== "undefined") {
  colorBlindness.subscribe(
    ($colorBlindness) => (localStorage.colorBlindness = JSON.stringify($colorBlindness))
  );
}
