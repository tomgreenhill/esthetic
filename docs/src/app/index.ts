import { Application } from '@hotwired/stimulus';
import { Accordion } from './components/accordion';
import { Drawer } from './components/drawer';
import { Sticky } from './components/sticky';
import { Example } from './components/example';
import { ScrollSpy } from './components/scrollspy';
import { Playground  } from './components/playground'

import spx from 'spx';

spx.connect({
  hover: {
    trigger: 'href'
  },
  progress: false
})((state) => {

  const stimulus = Application.start();

  stimulus.register('drawer', Drawer);
  stimulus.register('accordion', Accordion);
  stimulus.register('sticky', Sticky);
  stimulus.register('example', Example);
  stimulus.register('scrollspy', ScrollSpy);
  stimulus.register('playground', Playground);
});

spx.on('visit', event => {

  return false
})
