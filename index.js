'use strict';

const startButton = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],           // + Доходы
    expensesPlus = document.getElementsByTagName('button')[1],          // + Расходы
    checkDeposit = document.querySelector('#deposit-check'),            //  Депозит
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),           // Месячный доход 
    incomeTitle = document.querySelector('input.income-title'),        //  Дополнительный доход наименование
    expensesTitle = document.querySelector('input.expenses-title'),    //  Обязательные расходы наименование   
    expensesAmount = document.querySelector('input.expenses-amount'),    //  Обязательные расходы сумма
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),   // Возможные расходы (через запятую)
    targetAmount = document.querySelector('.target-amount'),           // Цель
    periodSelect = document.querySelector('.period-select'),           // Range Период расчета
    cancel = document.querySelector('#cancel');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');          // Доп. доходы
 
        //  Проверка на число

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
        // Объект

const appData = {
    income: {},             // Подработка
    incomeMonth: 0,         // Сумма подработки в месяц
    addIncome: [],          // Доп. доходы
    expenses: {},           // Обяз. расходы
    addExpenses: [],        // Возможные расходы
    deposit: false,         // Депозит
    percentDeposit: 0,      // Процент депозита
    moneyDeposit: 0,        // Сумма депозита
    budget: 0,              // Доход в месяц
    budgetDay: 0,           // Доход - расход, в день
    budgetMonth: 0,         // Доход - расход, в месяц
    expensesMonth: 0,       // Расход в месяц 
    
    start: function() {
        
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        this.blocked();
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', appData.start.bind(appData));
        
    },
    blocked: function() {
        document.querySelectorAll('input[type=text]').forEach((item) => {
            item.disabled = true;
        });
        startButton.style.display = 'none';
        cancel.style.display = 'block';
        
    },
    reset: function () {
        document.querySelectorAll('input[type=text]').forEach((item) => {
            item.disabled = false;
            item.value = null;
        });
        cancel.style.display = 'none';
        startButton.style.display = 'block';
    },
    addIncomeBlock: function() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    addExpensesBlock: function() {       
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }           
        });
    },
    getAddExpenses: function() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {           // Все обяз. расходы в месяц
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    },
    getIncomeMonth: function() {
        for (let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    },
    getBudget: function() {                  // Накопления за месяц
        this.budgetMonth = this.budget + this.incomeMonth - appData.expensesMonth;
        this.budgetDay = Math.round(this.budgetMonth / 30); 
    },
    getTargetMonth: function() {
        return targetAmount.value / this.budgetMonth;     
    },
    getStatusIncome: function() {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        }   else if (this.budgetDay >= 600 && appData.budgetDay < 1200) {
                return ('У вас средний уровень дохода');
        }   else if (this.budgetDay < 600) {
                    if (this.budgetDay <= 0) {
                        return ('Что то пошло не так');
                    } else {
                        return ('К сожалению у вас уровень дохода ниже среднего');
                    }      
        } 
    },
    getInfoDeposit: function() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!isNumber(this.moneyDeposit));
        }
    },
    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    },
    stepPeriod: function(){
        let titlePeriod = document.querySelector('.period-amount');
        titlePeriod.textContent = periodSelect.value;
    },
    theButton: function() {
        startButton.disabled = true;
        if (salaryAmount.value !== '') {
            startButton.disabled = false;
        } 
    }
};
appData.theButton();
startButton.addEventListener('click', appData.start.bind(appData));
salaryAmount.addEventListener('input', appData.theButton.bind(appData));
periodSelect.addEventListener('input', appData.stepPeriod.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));

        //  Срок достижение цели
appData.getTargetMonth();

        // Заработок в сутки с учетом расходов
appData.getStatusIncome();

let stringExpenses = () => {
    let itemsExpenses = '';
    for (let i = 0; i < appData.addExpenses.length; i++) {
        let unitExpenses = appData.addExpenses[i] + ', ';
        const itemUppercase = unitExpenses.charAt(0).toUpperCase();
        unitExpenses = unitExpenses.substring(1, unitExpenses.length);
        unitExpenses = itemUppercase + unitExpenses;
        itemsExpenses += unitExpenses;
    }
    console.log(itemsExpenses);
};
stringExpenses();



