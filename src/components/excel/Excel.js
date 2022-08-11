import {$} from '@core/Dom';

export class Excel {
  constructor(selector, options) {
    this.$element = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.createElement('div', 'excel');

    this.components = this.components.map(function(Component) {
      const $element = $.createElement('div', Component.className);
      const component = new Component($element);
      $element.html(component.toHTML());
      $root.append($element);
      return component;
    });

    return $root;
  }

  render() {
    this.$element.append(this.getRoot());
    this.components.forEach(function(component) {
      component.init();
    });
  }
}
