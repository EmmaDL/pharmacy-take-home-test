import { DRUG_NAMES } from "../helpers";
import { dafalganUpdater } from "./dafalgan";
import { fervexUpdater } from "./fervex";
import { herbalTeaUpdater } from "./herbal-tea";
import { magicPillUpdater } from "./magic-pill";
import { normalDrugUpdater } from "./normal";

const drugUpdaters = {
  [DRUG_NAMES.HERBAL_TEA]: herbalTeaUpdater,
  [DRUG_NAMES.FERVEX]: fervexUpdater,
  [DRUG_NAMES.MAGIC_PILL]: magicPillUpdater,
};

export function getDrugUpdater(name) {
  return drugUpdaters[name] ?? normalDrugUpdater;
}
