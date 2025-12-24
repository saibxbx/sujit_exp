// salaryInput.js
// Component to input and display monthly salary

import { getSalary, setSalary } from '../utils.js';

export function renderSalaryInput(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'salary-section';

    function render() {
        const currentSalary = getSalary();
        wrapper.innerHTML = `
            <h2>💰 Monthly Salary</h2>
            <div class="salary-display">
                <span class="salary-amount">₹${currentSalary.toLocaleString()}</span>
            </div>
            <div class="salary-form">
                <div class="field">
                    <input type="number" id="salary-input" placeholder="Enter your salary" min="0" step="1" value="${currentSalary || ''}" />
                    <button type="button" id="set-salary-btn" class="btn btn-primary">Set Salary</button>
                </div>
            </div>
        `;

        const input = wrapper.querySelector('#salary-input');
        const btn = wrapper.querySelector('#set-salary-btn');

        btn.addEventListener('click', () => {
            const value = parseFloat(input.value);
            if (value >= 0) {
                setSalary(value);
                render();
                document.dispatchEvent(new CustomEvent('dataChanged'));
            }
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                btn.click();
            }
        });
    }

    render();
    document.addEventListener('dataChanged', render);
    container.appendChild(wrapper);
}
