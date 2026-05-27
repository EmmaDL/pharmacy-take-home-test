import { applyBenefitChange, MIN_BENEFIT } from "../helpers";

export const normalDrugUpdater = {
  update(drug) {
    if (drug.benefit > MIN_BENEFIT) {
      applyBenefitChange(drug, -1);
    }

    drug.expiresIn -= 1;

    if (drug.expiresIn < 0 && drug.benefit > MIN_BENEFIT) {
      applyBenefitChange(drug, -1);
    }
  },
};
