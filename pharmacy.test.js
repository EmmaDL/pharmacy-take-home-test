import fs from "fs";
import path from "path";

import { Drug, Pharmacy } from "./pharmacy";

const SIMULATION_DRUGS = [
  ["Doliprane", 20, 30],
  ["Dafalgan", 20, 30],
  ["Herbal Tea", 10, 5],
  ["Fervex", 12, 35],
  ["Magic Pill", 15, 40],
];

function simulateDays(drugs, days) {
  const pharmacy = new Pharmacy(drugs.map((drug) => new Drug(...drug)));
  const log = [];

  for (let day = 0; day < days; day++) {
    log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
  }

  return log;
}

describe("Pharmacy", () => {
  describe("30-day simulation", () => {
    it("matches the reference output file", () => {
      const expected = JSON.parse(
        fs.readFileSync(path.join(__dirname, "output.json"), "utf-8"),
      );

      expect(simulateDays(SIMULATION_DRUGS, 30)).toEqual(expected.result);
    });
  });
});
