export class Fixed {
  constructor(element, window, options) {
    this.$element = element;
    this.$until = options.until;
    this.$window = window;
    this.currentScroll = 0;
    this.fixed = false;
    this.lastFrame = null;
    this.minWidth = options.minWidth;
    this.offset = options.offset;
  }

  init() {
    this.height = this.$element.outerHeight();
    this.initial = {
      position: this.$element.css('position'),
      top: this.$element.css('top'),
    };
    this.minScroll = this.$element.offset().top - this.offset.top;

    if (this.$window.width() >= this.minWidth && ! this.lastFrame) {
      this.lastFrame = this.check();
    }
  }

  calculateUntil() {
    if (this.$until) {
      this.until = this.$until.offset().top - this.height - this.offset.bottom;
    }
  }

  registerEvents() {
    // Check if document is already loaded to prevent race condition
    if (document.readyState === 'complete') {
      this.calculateUntil();
    } else {
      this.$window.on('load', () => {
        this.calculateUntil();
      });
    }

    this.$window.resize(() => {
      // Remove fixed class for correct offset calculations
      this.removeFixed();
      this.reCalculate();
    });
  }

  // Method for public use
  reCalculate() {
    this.init();
    this.calculateUntil();
  }

  check() {
    return requestAnimationFrame(() => {
      this.calculate();
    });
  }

  calculate() {
    this.currentScroll = this.$window.scrollTop();

    if (this.currentScroll > this.minScroll) {
      this.setFixed();
      this.checkBottom();
    } else {
      this.removeFixed();
    }

    if (this.$window.width() >= this.minWidth) {
      this.lastFrame = this.check();
    } else {
      this.lastFrame = null;
    }
  }

  setFixed() {
    if (! this.fixed) {
      this.$element.css({
        position: 'fixed',
        top: this.offset.top,
      });
      this.fixed = true;
    }
  }

  removeFixed() {
    if (this.fixed) {
      this.$element.css(this.initial);
      this.fixed = false;
    }
  }

  checkBottom() {
    if (! this.until) {
      return;
    }

    if (this.currentScroll >= (this.until - this.offset.top)) {
      const top = this.until - this.currentScroll;

      this.$element.css('top', top);
    } else {
      this.$element.css('top', this.offset.top);
    }
  }
}
