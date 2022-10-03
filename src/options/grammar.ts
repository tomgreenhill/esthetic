import { Grammars, Options, LanguageProperName } from 'types/prettify';
import { set } from '@utils/helpers';
import { html, liquid, Type } from '@liquify/liquid-language-specs';
import { isArray } from '@utils/native';

export const grammar = new class Grammar {

  private static script: Grammars['script'] = {
    keywords: [
      'ActiveXObject',
      'ArrayBuffer',
      'AudioContext',
      'Canvas',
      'CustomAnimation',
      'DOMParser',
      'DataView',
      'Date',
      'Error',
      'EvalError',
      'FadeAnimation',
      'FileReader',
      'Flash',
      'Float32Array',
      'Float64Array',
      'FormField',
      'Frame',
      'Generator',
      'HotKey',
      'Image',
      'Iterator',
      'Intl',
      'Int16Array',
      'Int32Array',
      'Int8Array',
      'InternalError',
      'Loader',
      'Map',
      'MenuItem',
      'MoveAnimation',
      'Notification',
      'ParallelArray',
      'Point',
      'Promise',
      'Proxy',
      'RangeError',
      'Rectangle',
      'ReferenceError',
      'Reflect',
      'RegExp',
      'ResizeAnimation',
      'RotateAnimation',
      'Set',
      'SQLite',
      'ScrollBar',
      'Set',
      'Shadow',
      'StopIteration',
      'Symbol',
      'SyntaxError',
      'Text',
      'TextArea',
      'Timer',
      'TypeError',
      'URL',
      'Uint16Array',
      'Uint32Array',
      'Uint8Array',
      'Uint8ClampedArray',
      'URIError',
      'WeakMap',
      'WeakSet',
      'Web',
      'Window',
      'XMLHttpRequest'
    ]
  };

  private static html: Grammars['html'] = {
    embedded: {
      script: [
        {
          language: 'javascript'
        },
        {
          language: 'json',
          attribute: {
            type: [
              'application/json',
              'application/ld+json'
            ]
          }
        },
        {
          language: 'jsx',
          attribute: {
            type: [
              'text/jsx',
              'application/jsx'
            ]
          }
        }
      ],
      style: [
        {
          language: 'css'
        }
      ]
    },
    voids: html.voids,
    tags: []
  };

  private static liquid: Grammars['liquid'] = {
    embedded: {
      schema: [
        { language: 'json' }
      ],
      style: [
        { language: 'css' }
      ],
      stylesheet: [
        { language: 'css' },
        { language: 'scss', argument: /\s*['"]scss['"]/ }
      ],
      javascript: [
        { language: 'javascript' }
      ]
    },
    tags: [],
    else: [],
    singletons: []
  };

  private static style: Grammars['style'] = {
    units: [
      '%',
      'cap',
      'ch',
      'cm',
      'deg',
      'dpcm',
      'dpi',
      'dppx',
      'em',
      'ex',
      'fr',
      'grad',
      'Hz',
      'ic',
      'in',
      'kHz',
      'lh',
      'mm',
      'ms',
      'mS',
      'pc',
      'pt',
      'px',
      'Q',
      'rad',
      'rem',
      'rlh',
      's',
      'turn',
      'vb',
      'vh',
      'vi',
      'vmax',
      'vmin',
      'vw'
    ],
    atrules: [
      'charset',
      'color-profile',
      'counter-style',
      'font-face',
      'font-feature-values',
      'import',
      'keyframes',
      'layer',
      'media',
      'namespace',
      'page',
      'supports'
    ],
    pseudo: {
      classes: [
        'active',
        'any-link',
        'checked',
        'default',
        'defined',
        'disabled',
        'empty',
        'enabled',
        'first',
        'first-child',
        'first-of-type',
        'fullscreen',
        'focus',
        'focus-visible',
        'focus-within',
        'host',
        'hover',
        'indeterminate',
        'in-range',
        'invalid',
        'is',
        'lang',
        'last-child',
        'last-of-type',
        'left',
        'link',
        'modal',
        'not',
        'nth-child',
        'nth-col',
        'nth-last-child',
        'nth-last-of-type',
        'nth-of-type',
        'only-child',
        'only-of-type',
        'optional',
        'out-of-range',
        'picture-in-picture',
        'placeholder-shown',
        'paused',
        'playing',
        'read-only',
        'read-write',
        'required',
        'right',
        'root',
        'scope',
        'target',
        'valid',
        'visited',
        'where'
      ],
      elements: [
        'after',
        'backdrop',
        'before',
        'cue',
        'cue-region',
        'first-letter',
        'first-line',
        'file-selector-button',
        'marker',
        'part',
        'placeholder',
        'selection',
        'slotted'
      ],
      functions: [
        'after',
        'before',
        'first-letter',
        'first-line',
        'host',
        'host-context',
        'part',
        'slotted',
        'lang',
        'not',
        'nth-child',
        'nth-col',
        'nth-last-child',
        'nth-last-of-type',
        'nth-of-type',
        'where'
      ]
    }
  };

  public script: {
    keywords?: Set<string>;
  } = {};

  public style: {
    units?: Set<string>;
    atrules?: Set<string>;
    pseudoClasses?: Set<string>;
    pseudoElements?: Set<string>;
    pseudoFunctions?: Set<string>;
  } = {};

  public html: {
    tags?: Set<string>;
    voids?: Set<string>;
    embed?: {
      [tagName: string]: {
        language?: LanguageProperName;
        attribute?: string;
        value?(token: string):boolean
      }
    }
  } = { embed: {} };

  public liquid: {
    tags?: Set<string>;
    singletons?: Set<string>;
    else?: Set<string>;
    embed?: {
      [tagName: string]: {
        language?: LanguageProperName;
        attribute?(token: string): boolean
        end?(token: string): boolean
      }
    }
  } = { embed: {} };

  constructor () {

    console.log(Grammar.html.tags);
    this.runtime();
    this.script.keywords = set(Grammar.script.keywords);
    this.style.units = set(Grammar.style.units);
    this.style.atrules = set(Grammar.style.atrules);
    this.style.pseudoFunctions = set(Grammar.style.pseudo.functions);
    this.style.pseudoClasses = set(Grammar.style.pseudo.classes);
    this.style.pseudoElements = set(Grammar.style.pseudo.elements);
    this.html.tags = set(Grammar.html.tags);
    this.html.voids = set(Grammar.html.voids);
    this.liquid.tags = set(Grammar.liquid.tags);
    this.liquid.else = set(Grammar.liquid.else);
    this.liquid.singletons = set(Grammar.liquid.singletons);
    this.defaults();
  }

  runtime () {

    for (const name in html.tags) {
      const tag = html.tags[name];
      if (tag.void !== true) Grammar.html.tags.push(name);
    }

    for (const name in liquid.shopify.tags) {

      const tag = liquid.shopify.tags[name];

      if (tag.singular === true) {
        if (tag.type === Type.control) {
          Grammar.liquid.else.push(name);
        } else {
          Grammar.liquid.singletons.push(name);
        }
      } else if (tag.type !== Type.embedded) {
        Grammar.liquid.tags.push(name);
      }
    }

  }

  defaults () {

    for (const tag in Grammar.html.embedded) {

      this.html.embed[tag] = {};

      for (const { language, attribute = null } of Grammar.html.embedded[tag]) {

        this.html.embed[tag].language = language;

        if (typeof attribute === 'object') {
          for (const attr in attribute) {

            this.html.embed[tag].attribute = attr;

            if (isArray(attribute[attr])) {
              this.html.embed[tag].value = (v) => new Set(attribute[attr] as string).has(v);
            } else {
              this.html.embed[tag].value = (v) => new RegExp(attribute[attr] as string).test(v);
            }
          }
        } else {
          this.html.embed[tag].attribute = null;
        }
      }
    }

    for (const tag in Grammar.liquid.embedded) {

      this.liquid.embed[tag] = { end: (v) => new RegExp(`^{%-?\\s*end${tag}`).test(v) };

      for (const { language, argument } of Grammar.liquid.embedded[tag]) {

        this.liquid.embed[tag].language = language;

        if (argument) {
          if (isArray(argument)) {
            this.liquid.embed[tag].attribute = (v) => new Set(argument).has(v);
          } else {
            this.liquid.embed[tag].attribute = (v) => new RegExp(argument).test(v);
          }
        } else {
          this.liquid.embed[tag].attribute = null;
        }
      }

    }

  }

  embed (language: 'html' | 'liquid', tag: string) {

    return tag in this[language].embed;

  }

  extend (rules: Options['grammar']) {

    for (const rule in rules) {

      /* -------------------------------------------- */
      /* HTML GRAMMARS                                */
      /* -------------------------------------------- */

      if (rule === 'html') {

        if ('tags' in rules[rule] && isArray(rules[rule].tags)) {
          for (const tag of rules[rule].tags) {
            if (!this.html.tags.has(tag)) {
              Grammar.html.tags.push(tag);
              this.html.tags.add(tag);
            }
          }
        }

        if ('voids' in rules[rule] && isArray(rules[rule].voids)) {
          for (const tag of rules[rule].voids) {
            if (!this.html.voids.has(tag)) {
              Grammar.html.voids.push(tag);
              this.html.voids.add(tag);
            }
          }
        }

        if ('embedded' in rules[rule]) {
          // TODO
        }

      }

      /* -------------------------------------------- */
      /* LIQUID GRAMMARS                              */
      /* -------------------------------------------- */

      if (rule === 'liquid') {

        if ('tags' in rules[rule] && isArray(rules[rule].tags)) {
          for (const tag of rules[rule].tags) {
            if (!this.liquid.tags.has(tag)) {
              Grammar.liquid.tags.push(tag);
              this.liquid.tags.add(tag);
            }
          }
        }

        if ('else' in rules[rule] && isArray(rules[rule].else)) {
          for (const tag of rules[rule].else) {
            if (!this.liquid.else.has(tag)) {
              Grammar.liquid.else.push(tag);
              this.liquid.else.add(tag);
            }
          }
        }

        if ('singletons' in rules[rule] && isArray(rules[rule].singletons)) {
          for (const tag of rules[rule].singletons) {
            if (!this.liquid.singletons.has(tag)) {
              Grammar.liquid.singletons.push(tag);
              this.liquid.singletons.add(tag);
            }
          }
        }

        /* EMBEDDED REGIONS --------------------------- */

        if ('embedded' in rules[rule] && typeof rules[rule].embedded === 'object') {
          for (const tag in rules[rule].embedded) {

            if (!(tag in this.liquid.embed)) {
              this.liquid.embed[tag] = { end: (v) => new RegExp(`{%-?\\s*end${tag}`).test(v) };
            }

            for (const { language, argument } of rules[rule].embedded[tag]) {

              if (this.liquid.embed[tag].language !== language) {
                this.liquid.embed[tag].language = language;
              }

              if (argument) {
                if (this.liquid.embed[tag].attribute === null) {
                  if (isArray(argument)) {
                    this.liquid.embed[tag].attribute = (v) => set(argument).has(v);
                  } else {
                    this.liquid.embed[tag].attribute = (v) => new RegExp(argument).test(v);
                  }
                } else {

                  const args = [];

                  for (const defaults of Grammar.liquid.embedded[tag]) {
                    if (isArray(defaults.argument)) {
                      for (const def of defaults.argument) {
                        if (argument !== def) args.push(argument); else args.push(def);
                      }
                      this.liquid.embed[tag].attribute = (v) => set(args).has(v);
                    } else {
                      if (defaults.argument !== argument) {
                        this.liquid.embed[tag].attribute = (v) => new RegExp(argument as string).test(v);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      /* -------------------------------------------- */
      /* STYLE GRAMMARS                               */
      /* -------------------------------------------- */

      if (rule === 'style') {

        if ('units' in rules[rule] && isArray(rules[rule].units)) {
          for (const tag of rules[rule].units) {
            if (!this.style.units.has(tag)) {
              Grammar.style.units.push(tag);
              this.style.units.add(tag);
            }
          }
        }

        if ('atrules' in rules[rule] && isArray(rules[rule].atrules)) {
          for (const tag of rules[rule].atrules) {
            if (!this.style.atrules.has(tag)) {
              Grammar.style.atrules.push(tag);
              this.style.atrules.add(tag);
            }
          }
        }

        if ('pseudo' in rules[rule]) {

          if ('classes' in rules[rule].pseudo && isArray(rules[rule].pseudo.classes)) {
            for (const tag of rules[rule].pseudo.classes) {
              if (!this.style.pseudoClasses.has(tag)) {
                Grammar.style.pseudo.classes.push(tag);
                this.style.pseudoClasses.add(tag);
              }
            }
          }

          if ('elements' in rules[rule].pseudo && isArray(rules[rule].pseudo.elements)) {
            for (const tag of rules[rule].pseudo.elements) {
              if (!this.style.pseudoElements.has(tag)) {
                Grammar.style.pseudo.elements.push(tag);
                this.style.pseudoElements.add(tag);
              }
            }
          }
        }
      }

      /* -------------------------------------------- */
      /* SCRIPT GRAMMARS                              */
      /* -------------------------------------------- */

      if (rule === 'script') {
        if ('keywords' in rules[rule] && isArray(rules[rule].keywords)) {
          for (const tag of rules[rule].keywords) {
            if (!this.script.keywords.has(tag)) {
              Grammar.script.keywords.push(tag);
              this.script.keywords.add(tag);
            }
          }
        }
      }

    }
  }

}();
