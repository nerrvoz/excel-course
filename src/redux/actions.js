import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE} from '@/redux/types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data: data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data: data,
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data: data,
  };
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data: data,
  };
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data: data,
  };
}
