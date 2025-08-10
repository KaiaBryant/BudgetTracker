// Income
const incomeDescript = document.getElementById("income_des");
const incomeAmount = document.getElementById("income_amount");
const incomeBtn = document.getElementById("income_btn");
// Expense 
const expenseDescript = document.getElementById("expense_des");
const expenseAmount = document.getElementById("expense_amount");
const expenseBtn = document.getElementById("expense_btn");
// Summary Display
const summaryDisplay = document.getElementById("summary-display");
const totalIncomeDisplay = document.getElementById("total-income");
const totalExpenseDisplay = document.getElementById("total-expense");
const totalBudgetDisplay = document.getElementById("total-budget");

// Initial class 
class UserInput {
    constructor(description, amount) {
        this.description = description;
        this.amount = amount
    }

    getAmount() {
        return `$${this.amount.toFixed(2)}`;
    }

    getDisplay() {
        return `${this.description} - ${this.getAmount()}`;
    }
}

// Income & Expense class and initiating income and expesne as two different types 
class Income extends UserInput {
    constructor(description, amount) {
        super(description, amount);
        this.type = "income";
    }
}

class Expense extends UserInput {
    constructor(description, amount) {
        super(description, amount);
        this.type = "expense";
    }
}

// Budget class 
class Budget {
    constructor() {
        this.incomes = [];
        this.expenses = [];
    }

    // Allocating income or expense. If the input type is income, push users input as income and same for expense
    addUserInput(userinput) {
        if (userinput.type === "income") {
            this.incomes.push(userinput);
        } else {
            this.expenses.push(userinput)
        }

        this.displayUserInput(userinput);
        this.updateSummary();
    }
    // Create a method taking a parameter of the userInput and create a div 
    // that will append the income and/or expense (from userInput) to UI
    displayUserInput(userinput) {
        const entry = document.createElement("div");
        entry.classList.add("entry", userinput.type); // adding ".entry" and "userInput" classes
        entry.textContent = userinput.getDisplay(); // make visible in UI
        summaryDisplay.appendChild(entry);
    }
    // Calculate the sum of incomes and sum of expenses 
    getTotalIncome() {
        return this.incomes.reduce((sum, total) => sum + total.amount, 0);
    }

    getTotalExpense() {
        return this.expenses.reduce((sum, total) => sum + total.amount, 0);
    }

    updateSummary() {
        const income = this.getTotalIncome();
        const expense = this.getTotalExpense();
        const budget = income - expense;
        // displaying totals for UI
        totalIncomeDisplay.textContent = `Total Income: $${income.toFixed(2)}`;
        totalExpenseDisplay.textContent = `Total Expense: $${expense.toFixed(2)}`;
        totalBudgetDisplay.textContent = `Budget: $${budget.toFixed(2)}`;
    }

}

// For new entries 
const myBudget = new Budget();

// Event Listeners 
// When user clicks "Sumbit" button of the expense and income, the funtion take the input
// Description cannot be empty and amount has to be a number greater than 0 in order to be created and displayed
// Inputs clear when true

incomeBtn.addEventListener("click", () => {
    const description = incomeDescript.value.trim();
    const amount = parseFloat(incomeAmount.value.trim());

    if (description && !isNaN(amount) && amount > 0) {
        const income = new Income(description, amount);
        myBudget.addUserInput(income);
        incomeDescript.value = "";
        incomeAmount.value = "";
    }
});

expenseBtn.addEventListener("click", () => {
    const description = expenseDescript.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());

    if (description && !isNaN(amount) && amount > 0) {
        const expense = new Expense(description, amount);
        myBudget.addUserInput(expense);
        expenseDescript.value = "";
        expenseAmount.value = "";
    }
});