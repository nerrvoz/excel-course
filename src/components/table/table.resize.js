import {$} from '@core/Dom';

export function resizeHandler(event, $root) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const parentDataColValue = $parent.data.col;
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    });

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({
          right: -delta + 'px',
        });
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({
          bottom: -delta + 'px',
        });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === 'col') {
        $parent.css({
          width: value + 'px',
        });

        $root.findAll(`[data-col="${parentDataColValue}"]`).forEach(($element) => {
          $element.style.width = (value) + 'px';
        });
      } else {
        $parent.css({
          height: value + 'px',
        });
      }

      resolve({
        value,
        type,
        id: $parent.data[type],
      });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
    };
  });
}
