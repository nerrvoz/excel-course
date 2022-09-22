class Dom {
  constructor(selector) {
    this.$element = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html;
      return this;
    }

    return this.$element.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$element.textContent = text;
      return this;
    }

    if (this.$element.tagName.toLowerCase() === 'input') {
      return this.$element.value.trim();
    }

    return this.$element.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$element.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$element;
    }

    if (Element.prototype.append) {
      this.$element.append(node);
    } else {
      this.$element.appendChild(node);
    }

    return this;
  }

  closest(selector) {
    return $(this.$element.closest(selector));
  }

  getCoords() {
    return this.$element.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$element.querySelector(selector));
  }

  findAll(selector) {
    return this.$element.querySelectorAll(selector);
  }

  get data() {
    return this.$element.dataset;
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: Number(parsed[0]),
        col: Number(parsed[1]),
      };
    }
    return this.data.id;
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$element.style[key] = styles[key];
    });
  }

  getStyles(styles = []) {
    return styles.reduce((res, style) => {
      res[style] = this.$element.style[style];
      return res;
    }, {});
  }

  focus() {
    this.$element.focus();
    return this;
  }

  addClass(className) {
    this.$element.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$element.classList.remove(className);
    return this;
  }

  attr(name, value) {
    if (value) {
      this.$element.setAttribute(name, value);
      return this;
    }

    return this.$element.getAttribute(name);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.createElement = function(tagName, classes = '') {
  const element = document.createElement(tagName);

  if (classes) {
    element.classList.add(classes);
  }

  return $(element);
};
