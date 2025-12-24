// utils.js
// Helper functions to interact with localStorage for expense tracker

const STORAGE_KEY = 'expenseTrackerData';

/**
 * Get all data from localStorage
 */
export function getData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { salary: 0, expenses: [] };
}

/**
 * Save all data to localStorage
 */
export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Get salary
 */
export function getSalary() {
  return getData().salary;
}

/**
 * Set salary
 */
export function setSalary(amount) {
  const data = getData();
  data.salary = amount;
  saveData(data);
}

/**
 * Get all expenses
 */
export function getExpenses() {
  return getData().expenses;
}

/**
 * Add a new expense
 * @param {string} name - Expense name (e.g., Netflix, Coffee)
 * @param {number} amount - Expense amount
 */
export function addExpense(name, amount) {
  const data = getData();
  // Use combination of timestamp and random number to ensure unique IDs
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  data.expenses.push({
    id: uniqueId,
    name: name.trim(),
    amount: parseFloat(amount)
  });
  saveData(data);
}

/**
 * Remove an expense by id
 */
export function removeExpense(id) {
  const data = getData();
  data.expenses = data.expenses.filter(e => e.id !== id);
  saveData(data);
}

/**
 * Get total expenses
 */
export function getTotalExpenses() {
  const expenses = getExpenses();
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

/**
 * Get remaining balance (salary - expenses)
 */
export function getRemainingBalance() {
  return getSalary() - getTotalExpenses();
}

/**
 * Clear all data
 */
export function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
}
