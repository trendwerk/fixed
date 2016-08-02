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
    this.initial = {
      position: this.$element.css('position'),
      top: this.$element.css('top'),
    };
    this.minScroll = this.$element.offset().top - this.offset.top;
    this.until = this.$until.offset().top - this.$element.outerHeight() - this.offset.bottom;

    if (this.$window.width() >= this.minWidth && ! this.lastFrame) {
      this.lastFrame = this.check();
    }
  }

  registerEvents() {
    this.$window.resize(() => {
      // Remove fixed class for correct offset calculations
      this.removeFixed();
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

    if (this.$window.width() > this.minWidth) {
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
    if (this.currentScroll >= (this.until - this.offset.top)) {
      const top = this.until - this.currentScroll;

      this.$element.css('top', top);
    } else {
      this.$element.css('top', this.offset.top);
    }
  }
}
