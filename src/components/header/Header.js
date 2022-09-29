import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';
import * as actions from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" value="${title}" class="input">
      <div>
          <div class="button" data-button="remove">
              <span class="material-symbols-outlined" data-button="remove">delete</span>
          </div>
          <div class="button" data-button="exit">
              <span class="material-symbols-outlined" data-button="exit">exit_to_app</span>
          </div>
      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);

    if ($target.data.button === 'remove') {
      const decision = confirm('Delete?');

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigation('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigation('');
    }
  }
}
