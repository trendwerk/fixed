export class Fixed {
  constructor(element, window, options) {
    this.$element = element;
    this.$until = options.until;
    this.$window = window;
    this.currentScroll = 0;
    this.fixed = false;
    this.flush = {};
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

  registerEvents() {
    this.$window.resize(() => {
      // Remove fixed class for correct offset calculations
      this.removeFixed();
      this.render();

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

    if (this.currentScroll > this.minScroll) {
      this.setFixed();
      this.checkBottom();
    } else {
      this.removeFixed();
    }

    this.render();

    if (this.$window.width() >= this.minWidth) {
      this.lastFrame = this.check();
    } else {
      this.lastFrame = null;
    }
  }

  setFixed() {
    if (! this.fixed) {
      this.flush = {
        position: 'fixed',
        top: this.offset.top,
      };
      this.fixed = true;
    }
  }

  removeFixed() {
    if (this.fixed) {
      this.flush = this.initial;
      this.fixed = false;
    }
  }

  checkBottom() {
    if (! this.$until) {
      return;
    }

    const until = this.$until.offset().top - this.height - this.offset.bottom;

    if (this.currentScroll >= (until - this.offset.top)) {
      const top = until - this.currentScroll;
      this.flush.top = top;
    } else {
      this.flush.top = this.offset.top;
    }
  }

  render() {
    if (this.flush) {
      this.$element.css(this.flush);
    }
  }
}
