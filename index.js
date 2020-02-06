let startButton = document.getElementById('start');
console.log('startButton: ', startButton);

let incomeAdd = document.getElementsByTagName('button')[0];
console.log('incomeAdd: ', incomeAdd);

let expensesAdd = document.getElementsByTagName('button')[1];
console.log('expensesAdd: ', expensesAdd);

let checkDeposit = document.querySelector('#deposit-check');
console.log('checkDeposit: ', checkDeposit);

let additionalIncome = document.querySelectorAll('.additional_income-item');
console.log('additionalIncome: ', additionalIncome);



let budgetDayValue = document.getElementsByClassName('budget_day-value');
console.log('budgetDayValue: ', budgetDayValue);
let expensesMonthValue = document.getElementsByClassName('expenses_month-value');
console.log('expensesMonthValue: ', expensesMonthValue);
let additionalIncomeValue = document.getElementsByClassName('additional_income-value');
console.log('additionalIncomeValue: ', additionalIncomeValue);
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
console.log('additionalExpensesValue: ', additionalExpensesValue);
let incomePeriodValue = document.getElementsByClassName('income_period-value');
console.log('incomePeriodValue: ', incomePeriodValue);
let targetMonthValue = document.getElementsByClassName('target_month-value');
console.log('targetMonthValue: ', targetMonthValue);
let budgetMonthValue = document.getElementsByClassName('budget_month-value');
console.log('budgetMonthValue: ', budgetMonthValue);



let salaryAmount = document.querySelector('.salary-amount');  // Месячный доход 
console.log('salaryAmount: ', salaryAmount);

let incomeTitle = document.querySelector('input.income-title');  //  Дополнительный доход наименование
console.log('incomeTitle: ', incomeTitle);
let incomeAmount = document.querySelector('input.income-amount');  //  Дополнительный доход сумма
console.log('incomeAmount: ', incomeAmount);
let expensesTitle = document.querySelector('input.expenses-title'); //  Обязательные расходы наименование
console.log('expensesTitle: ', expensesTitle);
let expensesAmount = document.querySelector('input.expenses-amount');  //  Обязательные расходы сумма
console.log('expensesAmount: ', expensesAmount);
let additionalExpensesItem = document.querySelector('.additional_expenses-item'); // Возможные расходы (через запятую)
console.log('additionalExpensesItem: ', additionalExpensesItem);
let targetAmount = document.querySelector('.target-amount');    // Цель
console.log('targetAmount: ', targetAmount);

let periodSelect = document.querySelector('.period-select');    // Range Период расчета
console.log('periodSelect: ', periodSelect);









