import fs from "fs";
import path from "path";

import { Drug, Pharmacy } from "./pharmacy";

function updateSingleDrug(name, expiresIn, benefit) {
  const pharmacy = new Pharmacy([new Drug(name, expiresIn, benefit)]);
  const [drug] = pharmacy.updateBenefitValue();
  return drug;
}

function simulateDays(drugs, days) {
  const pharmacy = new Pharmacy(drugs.map((drug) => new Drug(...drug)));
  const log = [];

  for (let day = 0; day < days; day++) {
    log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
  }

  return log;
}

describe("Pharmacy", () => {
  describe("normal drugs", () => {
    it("decreases benefit and expiresIn by 1 each day", () => {
      const drug = updateSingleDrug("Doliprane", 2, 3);

      expect(drug).toMatchObject({
        name: "Doliprane",
        expiresIn: 1,
        benefit: 2,
      });
    });

    it("decreases benefit twice as fast after expiration", () => {
      const drug = updateSingleDrug("Doliprane", 0, 10);

      expect(drug).toMatchObject({ expiresIn: -1, benefit: 8 });
    });
  });

  describe("benefit boundaries", () => {
    it("never decreases benefit below 0", () => {
      const drug = updateSingleDrug("Doliprane", 5, 0);

      expect(drug.benefit).toBe(0);
    });

    it("never increases benefit above 50", () => {
      const drug = updateSingleDrug("Herbal Tea", 5, 50);

      expect(drug.benefit).toBe(50);
    });
  });

  describe("Herbal Tea", () => {
    it("increases benefit as it gets older", () => {
      const drug = updateSingleDrug("Herbal Tea", 10, 5);

      expect(drug).toMatchObject({ expiresIn: 9, benefit: 6 });
    });

    it("increases benefit twice as fast after expiration", () => {
      const drug = updateSingleDrug("Herbal Tea", 0, 5);

      expect(drug).toMatchObject({ expiresIn: -1, benefit: 7 });
    });
  });

  describe("Magic Pill", () => {
    it("never expires nor decreases in benefit", () => {
      const drug = updateSingleDrug("Magic Pill", 15, 40);

      expect(drug).toMatchObject({ expiresIn: 15, benefit: 40 });
    });
  });

  describe("Fervex", () => {
    it("increases benefit by 1 when more than 10 days remain", () => {
      const drug = updateSingleDrug("Fervex", 12, 35);

      expect(drug).toMatchObject({ expiresIn: 11, benefit: 36 });
    });

    it("increases benefit by 2 when 10 days or less remain", () => {
      const drug = updateSingleDrug("Fervex", 10, 35);

      expect(drug).toMatchObject({ expiresIn: 9, benefit: 37 });
    });

    it("increases benefit by 3 when 5 days or less remain", () => {
      const drug = updateSingleDrug("Fervex", 5, 35);

      expect(drug).toMatchObject({ expiresIn: 4, benefit: 38 });
    });

    it("drops benefit to 0 after expiration", () => {
      const drug = updateSingleDrug("Fervex", 0, 20);

      expect(drug).toMatchObject({ expiresIn: -1, benefit: 0 });
    });
  });

  describe("30-day simulation", () => {
    it("matches the reference output file", () => {
      const expected = JSON.parse(
        fs.readFileSync(path.join(__dirname, "output.json"), "utf-8"),
      );
      const actual = simulateDays(
        [
          ["Doliprane", 20, 30],
          ["Herbal Tea", 10, 5],
          ["Fervex", 12, 35],
          ["Magic Pill", 15, 40],
        ],
        30,
      );

      expect(actual).toEqual(expected.result);
    });
  });
});
