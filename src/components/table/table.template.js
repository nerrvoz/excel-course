const CODES = {
  A: 65,
  Z: 90,
};

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
    `;
}

function createColumn(char, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${char}
      <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createCell(_, index) {
  return `<div class="cell" contenteditable="true" data-col="${index}"></div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount).fill('').map(toChar).map(createColumn).join('');
  rows.push(createRow(null, cols));

  for (let i = 1; i <= rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(createCell).join('');
    rows.push(createRow(i, cells));
  }

  return rows.join('');
}
