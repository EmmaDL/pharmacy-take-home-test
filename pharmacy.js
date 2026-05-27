const MAX_BENEFIT = 50;
const MIN_BENEFIT = 0;

const DRUG_NAMES = {
  HERBAL_TEA: "Herbal Tea",
  FERVEX: "Fervex",
  MAGIC_PILL: "Magic Pill",
  DAFALGAN: "Dafalgan",
};

function clampBenefit(value) {
  return Math.min(MAX_BENEFIT, Math.max(MIN_BENEFIT, value));
}

function applyBenefitChange(drug, delta) {
  drug.benefit = clampBenefit(drug.benefit + delta);
}

function updateBenefitBeforeDayEnd(drug) {
  const isHerbalTeaOrFervex =
    drug.name === DRUG_NAMES.HERBAL_TEA || drug.name === DRUG_NAMES.FERVEX;

  if (!isHerbalTeaOrFervex) {
    if (drug.benefit > MIN_BENEFIT && drug.name !== DRUG_NAMES.MAGIC_PILL) {
      applyBenefitChange(drug, -1);
    }
    return;
  }

  if (drug.benefit < MAX_BENEFIT) {
    applyBenefitChange(drug, 1);
  }

  if (drug.name === DRUG_NAMES.FERVEX) {
    if (drug.expiresIn < 11 && drug.benefit < MAX_BENEFIT) {
      applyBenefitChange(drug, 1);
    }
    if (drug.expiresIn < 6 && drug.benefit < MAX_BENEFIT) {
      applyBenefitChange(drug, 1);
    }
  }
}

function updateExpiresIn(drug) {
  if (drug.name !== DRUG_NAMES.MAGIC_PILL) {
    drug.expiresIn -= 1;
  }
}

function applyPostExpirationEffect(drug) {
  if (drug.expiresIn >= 0) {
    return;
  }

  if (drug.name === DRUG_NAMES.HERBAL_TEA) {
    if (drug.benefit < MAX_BENEFIT) {
      applyBenefitChange(drug, 1);
    }
    return;
  }

  if (drug.name === DRUG_NAMES.FERVEX) {
    drug.benefit = MIN_BENEFIT;
    return;
  }

  if (drug.benefit > MIN_BENEFIT && drug.name !== DRUG_NAMES.MAGIC_PILL) {
    applyBenefitChange(drug, -1);
  }
}

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (const drug of this.drugs) {
      updateBenefitBeforeDayEnd(drug);
      updateExpiresIn(drug);
      applyPostExpirationEffect(drug);
    }

    return this.drugs;
  }
}
