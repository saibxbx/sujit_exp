import './style.css';
import { renderSalaryInput } from './components/salaryInput.js';
import { renderExpenseForm } from './components/expenseForm.js';
import { renderBalanceSummary } from './components/balanceSummary.js';
import { renderExpensePieChart } from './components/expensePieChart.js';

// Build the main app layout
const app = document.querySelector('#app');
app.innerHTML = `
  <div class="app-container">
    <header class="header">
      <div class="header-brand">
        <div class="header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <h1>Expense Tracker</h1>
      </div>
      <p class="header-subtitle">Track your salary and expenses with style</p>
    </header>
    
    <section id="salary-section" class="section card-glow"></section>
    <section id="balance-section" class="section card-glow"></section>
    <section id="expense-section" class="section card-glow"></section>
    <section id="chart-section" class="section card-glow chart-wrapper"></section>
  </div>
`;

// Render all components
renderSalaryInput(document.getElementById('salary-section'));
renderBalanceSummary(document.getElementById('balance-section'));
renderExpenseForm(document.getElementById('expense-section'));
renderExpensePieChart(document.getElementById('chart-section'));
