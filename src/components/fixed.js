export class Fixed {
  constructor(element, window, options) {
    this.$element = element;
    this.$window = window;
    this.currentScroll = 0;
    this.fixed = false;
    this.lastFrame = null;
    this.minWidth = options.minWidth;
    this.offset = options.offset;
  }

  init() {
    this.elementOffset = parseInt(this.$element.css('top'));
    this.minScroll = this.$element.offset().top - this.offset;

    if (this.$window.width() >= this.minWidth && ! this.lastFrame) {
      this.lastFrame = this.check();
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

    console.log(this.offset, this.elementOffset, this.minScroll);

    if (this.currentScroll > this.minScroll) {
      this.setFixed();
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

      if (this.offset) {
        this.$element.css('top', `${this.offset}px`);
      }

      this.fixed = true;
    }
  }

  removeFixed() {
    if (this.fixed) {
      this.$element.removeClass('fixed');

      if (this.offset) {
        this.$element.css('top', this.elementOffset);
      }

      this.fixed = false;
    }
  }
}
