import { isPrimitive, isArray } from './jsTypeValidator';

export const validateWithRules = (values, rules) => {
  const validate = (values, rules) => {
    return values.every((value) =>
      Object.entries(rules).some(
        ([testRule, fullRule]) =>
          value.match(new RegExp(testRule)) && value.match(new RegExp(fullRule))
      )
    );
  };
  if (isPrimitive(values)) {
    values = [values];
    return validate(values, rules);
  } else if (isArray(value)) {
    return validate(values, rules);
  } else {
    return new Error(
      '[Validate Error] please provide a primitive value or a values Array'
    );
  }
};

export const validateWithRuleList = (value, rules) => {
  return rules.includes(value);
};
