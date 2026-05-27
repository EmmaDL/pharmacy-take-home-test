import { applyBenefitChange, MAX_BENEFIT, MIN_BENEFIT } from "../helpers";

export const fervexUpdater = {
  update(drug) {
    if (drug.benefit < MAX_BENEFIT) {
      applyBenefitChange(drug, 1);
    }
    if (drug.expiresIn < 11 && drug.benefit < MAX_BENEFIT) {
      applyBenefitChange(drug, 1);
    }
    if (drug.expiresIn < 6 && drug.benefit < MAX_BENEFIT) {
      applyBenefitChange(drug, 1);
    }

    drug.expiresIn -= 1;

    if (drug.expiresIn < 0) {
      drug.benefit = MIN_BENEFIT;
    }
  },
};
