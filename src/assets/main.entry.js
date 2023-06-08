import './styles/main/main.css';

import TVScreen from './scripts/components/Screen.svelte';
import HeaderControls from './scripts/components/HeaderControls.svelte';
import { raf } from './scripts/modules/utils.js';
import { screenEl } from './scripts/modules/tv.js';
import { initTextNav } from './scripts/modules/textNav.js';
import { initHotkeys } from './scripts/modules/keyboard.js';
import { initLinks } from './scripts/modules/links.js';

const bootstrap = () => {
  raf(() => {
    initTextNav();
    initHotkeys();
    initLinks();

    new TVScreen({ target: screenEl });

    new HeaderControls({
      target: document.querySelector('.js-header-controls'),
    });

    });
  });
};

if (document.readyState !== 'interactive') {
  window.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
