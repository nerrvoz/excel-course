import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  prepare() {

  }

  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListener();
  }

  destroy() {
    this.removeDOMListener();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
