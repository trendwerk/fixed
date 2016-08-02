import { Fixed } from './fixed';

export class Plugin {
  init() {
    $.fn.fixed = function fixed() {
      if (! window.requestAnimationFrame) {
        return false;
      }

      const plugin = new Fixed();

      return plugin;
    };
  }
}
