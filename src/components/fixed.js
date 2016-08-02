export class Fixed {
  constructor(element, window, options) {
    this.$element = element;
    this.$window = window;
    this.currentScroll = 0;
    this.fixed = false;
    this.lastFrame = null;
    this.minWidth = options.minWidth;
  }

  init() {
    this.minScroll = this.$element.outerHeight();

    if (this.$window.width() >= this.minWidth && ! this.lastFrame) {
      this.lastFrame = this.check();
      this.setFixed();
    } else if (! this.lastFrame) {
      this.removeFixed();
    }
  }

  registerEvents() {
    this.$window.resize(() => {
      this.init();
    });
  }

  check() {
    return requestAnimationFrame(() => {
      this.calculate();
    });
  }

  calculate() {
    this.currentScroll = this.$window.scrollTop();

    if (this.$window.width() > this.minWidth) {
      this.lastFrame = this.check();
    } else {
      this.lastFrame = null;
    }
  }

  setFixed() {
    if (! this.fixed) {
      this.$element.addClass('fixed');
      this.fixed = true;
    }
  }

  removeFixed() {
    if (this.fixed) {
      this.$element.removeClass('fixed');
      this.fixed = false;
    }
  }
}
