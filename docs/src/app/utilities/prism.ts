import Prism from "prismjs";

export function prism () {


Prism.languages.insertBefore('inside', 'attr-value', {
  'tag-name': {
    lookbehind: true,
    pattern: /({%-?)\s*\b([a-z]+)\b(?=[\s-])/i
  },
  string: {
    greedy: true,
    pattern: /"[^"]*"|'[^']*'/,
    inside: {
      punctuation: /{[{%]-?|-?[%}]}/,
      'attr-object': {
        lookbehind: true,
        pattern: /([a-z]*?)\s*[[\]0-9_\w$]+(?=\.)/i
      },
      'attr-property': {
        lookbehind: true,
        pattern: /(\.)\s*?[[\]\w0-9_$]+(?=[.\s?])/i
      }
    }
  },
  punctuation: /{[{%]-?|-?[%}]}/,
  'attr-object': {
    lookbehind: true,
    pattern: /([a-z]*?)\s*[[\]0-9_\w$]+(?=\.)/i
  },
  'attr-property': {
    lookbehind: true,
    pattern: /(\.)\s*?[[\]\w0-9_$]+(?=[.\s?])/i
  },
  'punctuation-chars': {
    global: true,
    pattern: /[.,|:?]/
  },
  'attr-eq': /=/
}, Prism.languages.markup.tag);


  return Prism.languages.extend('markup', {
  'tag': {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[^\s>\/:]+:/
        }
      },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          'punctuation': [
            {
              pattern: /^=/,
              alias: 'attr-equals'
            },
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true
            }
          ]
        }
      },
      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: {
          'namespace': /^[^\s>\/:]+:/
        }
      }

    }
  },
  'delimiters': {
    pattern: /{[{%]-?[\s\S]*-?[%}]}/,
    inside: {
    'liquid-comment': {
      lookbehind: true,
      global: true,
      pattern: /(?:\{%-?\s*comment\s*-?%\}[\s\S]+\{%-?\s*endcomment\s*-?%\}|\{%-?\s*#[\s\S]+?-?%\})/
    },
    'liquid-tag': {
      lookbehind: true,
      pattern: /({%-?)\s*\b([a-z]+)\b(?=[\s-%])/i
    },
    'liquid-tagged': {
      greedy: true,
      multiline: true,
      pattern: /\n\s+\b((?:end)?[a-z]+|echo)\b/
    },
    'liquid-object': {
      lookbehind: true,
      pattern: /[a-z_$][\w$]+(?=\.\s*)/i
    },
    'liquid-property': {
      lookbehind: true,
      pattern: /(\.\s*)[a-z_$][\w$]+(?=[.\s])/i
    },
    'liquid-filter': {
      lookbehind: true,
      pattern: /(\|)\s*(\w+)(?=[:]?)/
    },
    'liquid-string': {
      lookbehind: true,
      pattern: /['"].*?['"]/
    },
    'liquid-punctuation': {
      global: true,
      pattern: /[.,|:?]/
    },
    'liquid-operator': {
      pattern: /[!=]=|<|>|[<>]=?|[|?:=-]|\b(?:and|contains(?=\s)|or)\b/
    },
    'liquid-boolean': {
      pattern: /\b(?:true|false|nil)\b/
    },
    'liquid-number': {
      pattern: /\b(?:\d+)\b/
    },
    'liquid-parameter': {
      lookbehind: true,
      global: true,
      greedy: true,
      pattern: /(,)\s*(\w+)(?=:)/i
    },
    'liquid-style': {
      inside: Prism.languages.style,
      lookbehind: true,
      pattern: /(\{%-?\s*style(?:sheet)?\s*-?%\})([\s\S]+?)(?=\{%-?\s*endstyle(?:sheet)?\s*-?%\})/
    },
    'liquid-javascript': {
      inside: Prism.languages.script,
      lookbehind: true,
      pattern: /(\{%-?\s*javascript\s*-?%\})([\s\S]*?)(?=\{%-?\s*endjavascript\s*-?%\})/
    },
    'liquid-schema': {
      inside: Prism.languages.json,
      lookbehind: true,
      pattern: /(\{%-?\s*schema\s*-?%\})([\s\S]+?)(?=\{%-?\s*endschema\s*-?%\})/
    }
  }
}
});


}
