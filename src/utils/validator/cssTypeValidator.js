import { validateWithRules, validateWithRuleList } from './utils';

export const isCssColor = (color) => {
  // 暂时没有针对颜色关键字的检查
  let rules = {
    '^#': '^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$',
    '^rgb\\(':
      '^[rR][gG][Bb][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[)]{1}$',
    '^rgba\\(':
      '^[rR][gG][Bb][Aa][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){3}[\\s]*(1|1.0|0|0.[0-9])[\\s]*[)]{1}$',
    '^hsl\\(':
      '^[hH][Ss][Ll][(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*)[)]$',
    '^hsla\\(':
      '^[hH][Ss][Ll][Aa][(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,){2}([\\s]*(1|1.0|0|0.[0-9])[\\s]*)[)]$',
  };
  return validateWithRules(color, rules);
};

export const isFlexJustify = (justify) => {
  const list = [
    'center',
    'start',
    'flex-start',
    'end',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
    'stretch',
    'initial',
    'inherit',
    'left',
    'right',
    'normal',
    'unset',
    'revert',
  ];
  return validateWithRuleList(justify, list);
};

export const isWidth = (width, widthType) => {
  const rules = {
    px$: 'px$',
  };
  return validateWithRules(width, rules);
};
