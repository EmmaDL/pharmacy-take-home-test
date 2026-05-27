export const MAX_BENEFIT = 50;
export const MIN_BENEFIT = 0;

export const DRUG_NAMES = {
  HERBAL_TEA: "Herbal Tea",
  FERVEX: "Fervex",
  MAGIC_PILL: "Magic Pill",
  DAFALGAN: "Dafalgan",
};

function clampBenefit(value) {
  return Math.min(MAX_BENEFIT, Math.max(MIN_BENEFIT, value));
}

export function applyBenefitChange(drug, delta) {
  drug.benefit = clampBenefit(drug.benefit + delta);
}
