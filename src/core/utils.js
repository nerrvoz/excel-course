export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }

  return new Array(end - start + 1).fill('').map((_, index) => start + index);
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(arg1, arg2) {
  if (typeof arg1 === 'object' && typeof arg2 === 'object') {
    return JSON.stringify(arg1) === JSON.stringify(arg2);
  }

  return arg1 === arg2;
}

export function camelCaseToDash( myStr ) {
  return myStr.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles).map((key) => {
    return `${camelCaseToDash(key)}: ${styles[key]}`;
  }).join(';');
}

export function debounce(fn, ms) {
  let timeout;

  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
  };
}
