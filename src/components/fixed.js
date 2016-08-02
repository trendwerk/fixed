export class Fixed {
  constructor(element, window, options) {
    this.$element = element;
    this.$until = options.until;
    this.$window = window;
    this.currentScroll = 0;
    this.fixed = false;
    this.lastFrame = null;
    this.minWidth = options.minWidth;
    this.radix = 10; // Decimal
  }

  init() {
    this.offset = parseInt(this.$element.css('margin-top'), this.radix);
    this.minScroll = this.$element.offset().top - this.offset;
    this.until = this.$until.offset().top - this.$element.outerHeight() - this.offset;

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

  checkBottom() {
    if (this.currentScroll >= this.until) {
      const top = this.until - this.currentScroll;

      this.$element.css('top', `${top}px`);
    }
  }
}
