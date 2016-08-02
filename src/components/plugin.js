import { Fixed } from './fixed';

export class Plugin {
  init() {
    $.fn.fixed = function fixed(options) {
      if (! window.requestAnimationFrame) {
        return false;
      }

      const defaults = {
        minWidth: 0,
        offset: 0,
      };

      const plugin = new Fixed(this, $(window), $.extend(defaults, options));
      plugin.init();
      plugin.registerEvents();

      return plugin;
    };
  }
}
