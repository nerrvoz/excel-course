const CODES = {
  A: 65,
  Z: 90,
};

function createRow(index, content) {
  return `
    <div class="row">
        <div class="row-info">${index ? index : ''}</div>
        <div class="row-data">${content}</div>
    </div>
  `;
}

function createColumn(char) {
  return `<div class="column">${char}</div>`;
}

function createCell() {
  return `<div class="cell" contenteditable="true"></div>`;
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
