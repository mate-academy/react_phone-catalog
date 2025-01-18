export function sortTable(index) {
  const table = document.querySelector('table');
  const rows = Array.from(table.rows).slice(1);
  let isNumeric = !isNaN(rows[0].cells[index].textContent);
  const isSalary = index === 4;

  const currentHeader = document.querySelectorAll('th')[index];

  const dataOrder = currentHeader.getAttribute('data-order');

  rows.sort((rowA, rowB) => {
    let cellA = rowA.cells[index].textContent;
    let cellB = rowB.cells[index].textContent;

    if (isSalary) {
      cellA = parseFloat(cellA.replace(/[$,]/g, ''));
      cellB = parseFloat(cellB.replace(/[$,]/g, ''));
      isNumeric = true;
    }

    if (isNumeric) {
      return dataOrder === 'asc' ? cellA - cellB : cellB - cellA;
    } else {
      return dataOrder === 'asc'
        ? cellA.localeCompare(cellB)
        : cellB.localeCompare(cellA);
    }
  });

  currentHeader.setAttribute(
    'data-order',
    dataOrder === 'asc' ? 'desc' : 'asc',
  );

  rows.forEach((row) => table.appendChild(row));
}
