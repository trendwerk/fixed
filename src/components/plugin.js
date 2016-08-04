import { Fixed } from './fixed';

export class Plugin {
  init() {
    jQuery.fn.fixed = function fixed(options) {
      if (! window.requestAnimationFrame) {
        return false;
      }

      if (! this.length) {
        return;
      }

      const defaults = {
        minWidth: 0,
        offset: {
          bottom: 0,
          top: 0,
        },
        until: null,
      };

      const plugin = new Fixed(this, jQuery(window), jQuery.extend(true, defaults, options));
      plugin.init();
      plugin.registerEvents();

      return plugin;
    };
  }
}
