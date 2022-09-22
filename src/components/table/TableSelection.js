export class TableSelection {
  static CLASS_SELECTED = 'selected'

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($element) {
    this.clearGroup();
    $element.focus().addClass(TableSelection.CLASS_SELECTED);
    this.group.push($element);
    this.current = $element;
  }

  clearGroup() {
    this.group.forEach((element) => {
      element.removeClass(TableSelection.CLASS_SELECTED);
    });
    this.group = [];
  }

  selectGroup($elements = []) {
    this.clearGroup();
    this.group = $elements;
    this.group.forEach(($element) => $element.addClass(TableSelection.CLASS_SELECTED));
  }

  get selectedIds() {
    return this.group.map(($element) => $element.id());
  }

  applyStyle(style) {
    this.group.forEach(($element) => {
      $element.css(style);
    });
  }
}
