import test from 'ava';
import util from '@prettify/tests';
import prettify from '@liquify/prettify';

test.serial('Delimiter Trims Cases', async t => {

  await util.forRule('cases/liquid')(
    {
      'delimiter-trims-force': [
        { delimiterTrims: 'force', delimiterSpacing: true },
        { delimiterTrims: 'force', delimiterSpacing: false }
      ],
      'delimiter-trims-strip': [
        { delimiterTrims: 'strip', delimiterSpacing: true },
        { delimiterTrims: 'strip', delimiterSpacing: false }
      ],
      'delimiter-trims-tags': [
        { delimiterTrims: 'tags', delimiterSpacing: true },
        { delimiterTrims: 'tags', delimiterSpacing: false }
      ],
      'delimiter-trims-outputs': [
        { delimiterTrims: 'outputs', delimiterSpacing: true },
        { delimiterTrims: 'outputs', delimiterSpacing: false }
      ],
      'delimiter-trims-preserve': [
        { delimiterTrims: 'preserve', delimiterSpacing: true },
        { delimiterTrims: 'preserve', delimiterSpacing: false }
      ]
    }
    , async function (source, markup, label) {

      const output = await prettify.format(source, { language: 'liquid', markup });

      t.snapshot(output, label.description);

      // t.log(input);

    }
  );

  t.pass();

});

test.serial('Preserve Inlined Outputs in Text Nodes', async t => {

  await util.forRule('cases/liquid')(
    {
      'preserve-inline-1': [
        { forceIndent: true },
        { forceIndent: true, preserveText: true },
        { forceIndent: true, preserveText: false },
        { forceIndent: false },
        { forceIndent: false, preserveText: true },
        { forceIndent: false, preserveText: false }
      ],
      'preserve-inline-2': [
        { forceIndent: true },
        { forceIndent: true, preserveText: true },
        { forceIndent: true, preserveText: false },
        { forceIndent: false },
        { forceIndent: false, preserveText: true },
        { forceIndent: false, preserveText: false }
      ]
    }
    , async function (source, markup, label) {

      const output = await prettify.format(source, { language: 'liquid', markup });

      t.snapshot(output, label.description);
      // t.log(output);

    }
  );

  t.pass();

});

test.serial('Multilined Tags', async t => {

  await util.forSample('cases/liquid')(
    [
      'multiline-tag-1'
    ]
    , async function (source, label) {

      const output = await prettify.format(source, {
        language: 'liquid',
        preserveLine: 3
      });

      t.snapshot(output, label.description);

      // t.log(output);

    }
  );

  t.pass();

});

test.serial.skip('Comment Preservation', async t => {

  const source = await util.getSample('cases/liquid/comment-preserve');

  const output = await prettify.format(source, {
    language: 'liquid'
  });

  t.log(output);
  t.pass();

});

test.serial.skip('Conditional Structures', async t => {

  const source = await util.getSample('cases/liquid/conditional-structure');

  const output = await prettify.format(source, {
    language: 'liquid',
    wrap: 80,
    markup: {
      forceAttribute: true,
      attributeChain: 'collapse',
      attributeValues: 'preserve'
    }
  });

  t.log(output);
  t.pass();

});

test.serial.skip('Liquid doctype', async t => {

  const source = await util.getSample('cases/liquid/document-sample');

  const output = await prettify.format(source, {
    language: 'liquid'
  });

  t.log(output);
  t.pass();

});
