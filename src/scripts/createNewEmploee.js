export function createNewEmploee() {
  const inputName = document.getElementById('name').value;
  const position = document.getElementById('position').value;
  const office = document.getElementById('office').value;
  const age = document.getElementById('age').value;
  const salary = document.getElementById('salary').value;
  const table = document.querySelector('tbody');
  const row = table.insertRow(0);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);

  cell1.innerHTML = inputName;
  cell2.innerHTML = position;
  cell3.innerHTML = office;
  cell4.innerHTML = age;
  cell5.innerHTML = correctSalary(salary);
}

function correctSalary(number) {
  const salary = number;

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 2,
  });

  return `${USDollar.format(salary)}`;
}
