import { Rules, ScriptRules } from 'types';

/**
 * Default Presets
 *
 * The default rules of Æsthetic from which all **presets** and
 * custom rules will be merged.
 */
export const defaults: Rules = {
  crlf: false,
  correct: false,
  preset: 'default',
  language: 'auto',
  endNewline: false,
  indentChar: ' ',
  indentLevel: 0,
  indentSize: 2,
  preserveLine: 2,
  wrap: 0,
  wrapFraction: 0,
  liquid: {
    commentNewline: false,
    commentIndent: true,
    delimiterTrims: 'preserve',
    delimiterPlacement: 'preserve',
    forceFilter: 0,
    forceArgument: 0,
    ignoreTagList: [],
    indentAttribute: false,
    lineBreakSeparator: 'before',
    normalizeSpacing: true,
    preserveComment: false,
    preserveInternal: false,
    dedentTagList: [],
    quoteConvert: 'none'
  },
  markup: {
    attributeCasing: 'preserve',
    attributeSort: false,
    commentNewline: false,
    commentIndent: true,
    delimiterTerminus: 'inline',
    forceAttribute: 3,
    forceAttributeValue: true,
    forceIndent: false,
    ignoreCSS: false,
    ignoreJS: true,
    ignoreJSON: false,
    lineBreakValue: 'preserve',
    preserveComment: false,
    preserveText: false,
    preserveAttribute: false,
    selfCloseSpace: true,
    selfCloseSVG: true,
    stripAttributeLines: false,
    quoteConvert: 'none'
  },
  json: <ScriptRules>{
    arrayFormat: 'default',
    braceAllman: false,
    bracePadding: false,
    objectIndent: 'default',
    objectSort: false,

    braceStyle: 'none',
    caseSpace: false,
    commentIndent: false,
    commentNewline: false,
    correct: false,
    elseNewline: false,
    functionNameSpace: false,
    functionSpace: false,
    methodChain: 4,
    neverFlatten: false,
    noCaseIndent: false,
    preserveComment: false,
    styleGuide: 'none',
    ternaryLine: false,
    variableList: 'none',

    quoteConvert: 'double',
    endComma: 'never',
    noSemicolon: true,
    vertical: false
  },
  style: {
    commentIndent: false,
    commentNewline: false,
    atRuleSpace: true,
    classPadding: false,
    noLeadZero: false,
    preserveComment: false,
    sortSelectors: false,
    sortProperties: false,
    quoteConvert: 'none'
  },
  script: {
    arrayFormat: 'default',
    braceNewline: false,
    bracePadding: false,
    braceStyle: 'none',
    braceAllman: false,
    caseSpace: false,
    commentIndent: false,
    commentNewline: false,
    elseNewline: false,
    endComma: 'never',
    functionNameSpace: false,
    functionSpace: false,
    inlineReturn: true,
    methodChain: 4,
    neverFlatten: false,
    noCaseIndent: false,
    noSemicolon: false,
    objectSort: false,
    objectIndent: 'default',
    preserveComment: false,
    quoteConvert: 'none',
    styleGuide: 'none',
    ternaryLine: false,
    variableList: 'none',
    vertical: false
  }
};
