// expenseForm.js
// Component to add custom expense types (e.g., netflix:50, coffee:10)

import { addExpense, getExpenses, removeExpense } from '../utils.js';

export function renderExpenseForm(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'expense-section';

    function render() {
        const expenses = getExpenses();

        wrapper.innerHTML = `
            <h2>📝 Add Expenses</h2>
            <div class="expense-form">
                <div class="form-row">
                    <div class="field">
                        <label>Expense Name</label>
                        <input type="text" id="expense-name" placeholder="e.g., Netflix, Coffee" />
                    </div>
                    <div class="field">
                        <label>Amount (₹)</label>
                        <input type="number" id="expense-amount" placeholder="50" min="0" step="0.01" />
                    </div>
                    <button type="button" id="add-expense-btn" class="btn btn-add">+ Add</button>
                </div>
            </div>
            <div class="expense-list">
                <h3>Your Expenses</h3>
                ${expenses.length === 0
                ? '<p class="no-expenses">No expenses added yet. Start adding your expenses above!</p>'
                : `<ul class="expenses-ul">
                        ${expenses.map(e => `
                            <li class="expense-item" data-id="${e.id}">
                                <span class="expense-name">${e.name}</span>
                                <span class="expense-price">₹${e.amount.toLocaleString()}</span>
                                <button class="btn-remove" data-id="${e.id}">×</button>
                            </li>
                        `).join('')}
                    </ul>`
            }
            </div>
        `;

        const nameInput = wrapper.querySelector('#expense-name');
        const amountInput = wrapper.querySelector('#expense-amount');
        const addBtn = wrapper.querySelector('#add-expense-btn');

        addBtn.addEventListener('click', () => {
            const name = nameInput.value.trim();
            const amount = parseFloat(amountInput.value);

            if (name && amount > 0) {
                addExpense(name, amount);
                nameInput.value = '';
                amountInput.value = '';
                render();
                document.dispatchEvent(new CustomEvent('dataChanged'));
            } else {
                if (!name) nameInput.focus();
                else amountInput.focus();
            }
        });

        // Add enter key support
        [nameInput, amountInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    addBtn.click();
                }
            });
        });

        // Remove expense buttons
        wrapper.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                removeExpense(id);
                render();
                document.dispatchEvent(new CustomEvent('dataChanged'));
            });
        });
    }

    render();
    document.addEventListener('dataChanged', render);
    container.appendChild(wrapper);
}
