'use strict';

let startButton = document.getElementById('start');
let incomePlus = document.getElementsByTagName('button')[0];           // + Доходы
let expensesPlus = document.getElementsByTagName('button')[1];          // + Расходы
let checkDeposit = document.querySelector('#deposit-check');            //  Депозит
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');           // Месячный доход 
let incomeTitle = document.querySelector('input.income-title');        //  Дополнительный доход наименование
let expensesTitle = document.querySelector('input.expenses-title');    //  Обязательные расходы наименование
let expensesItems = document.querySelectorAll('.expenses-items');       
let expensesAmount = document.querySelector('input.expenses-amount');    //  Обязательные расходы сумма
let additionalExpensesItem = document.querySelector('.additional_expenses-item');      // Возможные расходы (через запятую)
let targetAmount = document.querySelector('.target-amount');           // Цель
let periodSelect = document.querySelector('.period-select');           // Range Период расчета
let incomeItems = document.querySelectorAll('.income-items');          // Доп. доходы

        //  Проверка на число

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
        // Объект

let appData = {
    income: {},             // Подработка
    incomeMonth: 0,
    addIncome: [],          // Доп. доходы
    expenses: {},           // Обяз. расходы
    addExpenses: [],        // Возможные расходы
    deposit: false,         // Депозит
    percentDeposit: 0,      // Процент депозита
    moneyDeposit: 0,        // Сумма депозита
    budget: 0,              // Доход в месяц
    budgetDay: 0,           // Доход - расход в день
    budgetMonth: 0,         // Доход - расход в месяц
    expensesMonth: 0,       // Расход в месяц 
    
    start: function() {
        
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getIncomeMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());

        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('change', appData.start);
        
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    addExpensesBlock: function() {       
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }           
        });
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {           // Все обяз. расходы в месяц
        
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getIncomeMonth: function() {
        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    getBudget: function() {                  // Накопления за месяц
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.round(appData.budgetMonth / 30); 
    },
    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;     
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        }   else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
                return ('У вас средний уровень дохода');
        }   else if (appData.budgetDay < 600) {
                    if (appData.budgetDay <= 0) {
                        return ('Что то пошло не так');
                    } else {
                        return ('К сожалению у вас уровень дохода ниже среднего');
                    }      
        } 
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!isNumber(appData.moneyDeposit));
        }
    },
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    },
    stepPeriod: function(){
        let titlePeriod = document.querySelector('.period-amount');
        titlePeriod.textContent = periodSelect.value;
    },
    theButton: function() {
        startButton.disabled = true;
        console.log(salaryAmount.value);
        
        if (salaryAmount.value !== '') {
            startButton.disabled = false;
        } 
    }
};
appData.theButton();
startButton.addEventListener('click', appData.start);
salaryAmount.addEventListener('change', appData.theButton);
periodSelect.addEventListener('click', appData.stepPeriod);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);


        //  Срок достижение цели
appData.getTargetMonth();

        // Заработок в сутки с учетом расходов
appData.getStatusIncome();

let stringExpenses = function(){
    let itemsExpenses = '';
    for (let i = 0; i < appData.addExpenses.length; i++) {
        let unitExpenses = appData.addExpenses[i] + ', ';
        let itemUppercase = unitExpenses.charAt(0).toUpperCase();
        unitExpenses = unitExpenses.substring(1, unitExpenses.length);
        unitExpenses = itemUppercase + unitExpenses;
        itemsExpenses += unitExpenses;
    }
    console.log(itemsExpenses);
};
stringExpenses();



