import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';
import * as actions from '@/redux/actions';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" value="${title}" class="input">
      <div>
          <div class="button">
              <span class="material-symbols-outlined">delete</span>
          </div>
          <div class="button">
              <span class="material-symbols-outlined">exit_to_app</span>
          </div>
      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }
}
