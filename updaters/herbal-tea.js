import { applyBenefitChange, MAX_BENEFIT } from "../helpers";

export const herbalTeaUpdater = {
  update(drug) {
    if (drug.benefit < MAX_BENEFIT) {
      applyBenefitChange(drug, 1);
    }

    drug.expiresIn -= 1;

    if (drug.expiresIn < 0 && drug.benefit < MAX_BENEFIT) {
      applyBenefitChange(drug, 1);
    }
  },
};
