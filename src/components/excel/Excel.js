import {$} from '@core/Dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {updateDate} from '@/redux/actions';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.emitter = new Emitter();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.createElement('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $element = $.createElement('div', Component.className);
      const component = new Component($element, componentOptions);
      $element.html(component.toHTML());
      $root.append($element);
      return component;
    });

    return $root;
  }

  init() {
    console.log(process.env.NODE_ENV);
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(function(component) {
      component.init();
    });
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(function(component) {
      component.destroy();
    });
  }
}
