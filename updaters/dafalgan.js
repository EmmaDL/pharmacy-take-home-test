import { applyBenefitChange, MIN_BENEFIT } from "../helpers";

export const dafalganUpdater = {
  update(drug) {
    if (drug.benefit > MIN_BENEFIT) {
      applyBenefitChange(drug, -2);
    }

    drug.expiresIn -= 1;

    if (drug.expiresIn < 0 && drug.benefit > MIN_BENEFIT) {
      applyBenefitChange(drug, -2);
    }
  },
};
