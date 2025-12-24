// balanceSummary.js
// Component to show salary, total expenses, and remaining balance

import { getSalary, getTotalExpenses, getRemainingBalance } from '../utils.js';

export function renderBalanceSummary(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'balance-section';

    function render() {
        const salary = getSalary();
        const totalExpenses = getTotalExpenses();
        const remaining = getRemainingBalance();
        const isPositive = remaining >= 0;

        wrapper.innerHTML = `
            <h2>📊 Balance Summary</h2>
            <div class="balance-cards">
                <div class="balance-card salary-card">
                    <div class="card-icon">💵</div>
                    <div class="card-content">
                        <span class="card-label">Salary</span>
                        <span class="card-value">₹${salary.toLocaleString()}</span>
                    </div>
                </div>
                <div class="balance-card expense-card">
                    <div class="card-icon">💸</div>
                    <div class="card-content">
                        <span class="card-label">Total Expenses</span>
                        <span class="card-value">₹${totalExpenses.toLocaleString()}</span>
                    </div>
                </div>
                <div class="balance-card remaining-card ${isPositive ? 'positive' : 'negative'}">
                    <div class="card-icon">${isPositive ? '✅' : '⚠️'}</div>
                    <div class="card-content">
                        <span class="card-label">Remaining</span>
                        <span class="card-value ${isPositive ? 'text-positive' : 'text-negative'}">
                            ₹${Math.abs(remaining).toLocaleString()}
                            ${!isPositive ? ' (Deficit)' : ''}
                        </span>
                    </div>
                </div>
            </div>
            <div class="balance-bar-container">
                <div class="balance-bar">
                    <div class="bar-expenses" style="width: ${salary > 0 ? Math.min((totalExpenses / salary) * 100, 100) : 0}%"></div>
                </div>
                <span class="bar-label">${salary > 0 ? Math.round((totalExpenses / salary) * 100) : 0}% spent</span>
            </div>
        `;
    }

    render();
    document.addEventListener('dataChanged', render);
    container.appendChild(wrapper);
}
