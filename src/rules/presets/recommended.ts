import { Rules } from 'types';

/**
 * Recommended Presets
 *
 * The `recommended` rule presets which produce the most common
 * and expect formatted results.
 */
export const recommended: Rules = {
  preset: 'recommended',
  language: 'auto',
  preserveLine: 2,
  wrap: 120,
  liquid: {
    forceLeadArgument: false,
    ignoreTagList: [ 'javascript' ],
    indentAttributes: true,
    commentNewline: true,
    delimiterTrims: 'tags',
    lineBreakSeparator: 'after',
    quoteConvert: 'double',
    filterWrap: 80,
    argumentWrap: 80,
    delimiterPlacement: 'consistent'
  },
  markup: {
    attributeCasing: 'lowercase-name',
    commentNewline: true,
    delimiterForce: true,
    forceAttribute: 1,
    forceLeadAttribute: true,
    forceIndent: true,
    ignoreCSS: false,
    ignoreJSON: false,
    selfCloseSpace: true,
    selfCloseSVG: true,
    quoteConvert: 'double'
  },
  json: {
    arrayFormat: 'indent',
    objectIndent: 'indent'
  },
  style: {
    commentNewline: true,
    commentIndent: true,
    correct: true,
    quoteConvert: 'double',
    noLeadZero: true,
    sortProperties: true
  }
};