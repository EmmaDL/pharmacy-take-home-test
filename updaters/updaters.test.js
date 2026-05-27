import { dafalganUpdater } from "./dafalgan";
import { fervexUpdater } from "./fervex";
import { herbalTeaUpdater } from "./herbal-tea";
import { magicPillUpdater } from "./magic-pill";
import { normalDrugUpdater } from "./normal";

function drug(name, expiresIn, benefit) {
  return { name, expiresIn, benefit };
}

describe("benefit boundaries", () => {
  it("never decreases benefit below 0", () => {
    const testDrug = drug("Doliprane", 5, 0);

    normalDrugUpdater.update(testDrug);

    expect(testDrug.benefit).toBe(0);
  });

  it("never increases benefit above 50", () => {
    const testDrug = drug("Herbal Tea", 5, 50);

    herbalTeaUpdater.update(testDrug);

    expect(testDrug.benefit).toBe(50);
  });
});

describe("normalDrugUpdater", () => {
  test.each([
    [drug("Doliprane", 2, 3), { expiresIn: 1, benefit: 2 }],
    [drug("Doliprane", 0, 10), { expiresIn: -1, benefit: 8 }],
  ])("update(%j)", (input, expected) => {
    normalDrugUpdater.update(input);

    expect(input).toMatchObject(expected);
  });
});

describe("dafalganUpdater", () => {
  test.each([
    [drug("Dafalgan", 2, 10), { expiresIn: 1, benefit: 8 }],
    [drug("Dafalgan", 0, 10), { expiresIn: -1, benefit: 6 }],
  ])("update(%j)", (input, expected) => {
    dafalganUpdater.update(input);

    expect(input).toMatchObject(expected);
  });
});

describe("herbalTeaUpdater", () => {
  test.each([
    [drug("Herbal Tea", 10, 5), { expiresIn: 9, benefit: 6 }],
    [drug("Herbal Tea", 0, 5), { expiresIn: -1, benefit: 7 }],
  ])("update(%j)", (input, expected) => {
    herbalTeaUpdater.update(input);

    expect(input).toMatchObject(expected);
  });
});

describe("magicPillUpdater", () => {
  it("never expires nor decreases in benefit", () => {
    const testDrug = drug("Magic Pill", 15, 40);

    magicPillUpdater.update(testDrug);

    expect(testDrug).toMatchObject({ expiresIn: 15, benefit: 40 });
  });
});

describe("fervexUpdater", () => {
  test.each([
    [drug("Fervex", 12, 35), { expiresIn: 11, benefit: 36 }],
    [drug("Fervex", 10, 35), { expiresIn: 9, benefit: 37 }],
    [drug("Fervex", 5, 35), { expiresIn: 4, benefit: 38 }],
    [drug("Fervex", 0, 20), { expiresIn: -1, benefit: 0 }],
  ])("update(%j)", (input, expected) => {
    fervexUpdater.update(input);

    expect(input).toMatchObject(expected);
  });
});
