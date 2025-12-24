// expensePieChart.js
// Component to render an attractive doughnut chart of expenses using Chart.js

import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { getExpenses, getTotalExpenses, getSalary } from '../utils.js';

// Register required Chart.js components for Doughnut chart
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

// Beautiful gradient color palette
const COLORS = [
    '#667eea', // Purple Blue
    '#f093fb', // Pink
    '#4facfe', // Sky Blue
    '#43e97b', // Green
    '#fa709a', // Rose
    '#fee140', // Yellow
    '#30cfd0', // Cyan
    '#ff6b6b', // Coral
    '#a78bfa', // Violet
    '#fbbf24', // Amber
    '#34d399', // Emerald
    '#f472b6', // Pink
];

// Gradient backgrounds for hover effects
const HOVER_COLORS = [
    '#7c8ff8', // Lighter Purple Blue
    '#f5a8fc', // Lighter Pink
    '#6fbdfe', // Lighter Sky Blue
    '#5eed8f', // Lighter Green
    '#fb8aae', // Lighter Rose
    '#fee85c', // Lighter Yellow
    '#4dd8d9', // Lighter Cyan
    '#ff8585', // Lighter Coral
    '#b9a3fb', // Lighter Violet
    '#fcc94d', // Lighter Amber
    '#4fdfaa', // Lighter Emerald
    '#f68cc3', // Lighter Pink
];

export function renderExpensePieChart(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'chart-section';
    wrapper.innerHTML = `
        <h2>🥧 Expense Breakdown</h2>
        <div class="chart-wrapper-inner">
            <div class="chart-container">
                <canvas id="expense-pie-chart"></canvas>
                <div class="chart-center-info">
                    <span class="center-label">Total Spent</span>
                    <span class="center-value" id="center-total">₹0</span>
                </div>
            </div>
            <div class="chart-legend-custom" id="custom-legend"></div>
        </div>
    `;

    container.appendChild(wrapper);

    const canvas = wrapper.querySelector('#expense-pie-chart');
    const legendContainer = wrapper.querySelector('#custom-legend');
    const centerTotal = wrapper.querySelector('#center-total');
    let chartInstance = null;

    function render() {
        const expenses = getExpenses();
        const totalExpenses = getTotalExpenses();
        const salary = getSalary();

        // Update center total
        centerTotal.textContent = `₹${totalExpenses.toLocaleString()}`;

        if (expenses.length === 0) {
            if (chartInstance) {
                chartInstance.destroy();
                chartInstance = null;
            }
            legendContainer.innerHTML = '';
            wrapper.querySelector('.chart-container').innerHTML = `
                <div class="no-chart-data">
                    <div class="empty-chart-icon">
                        <svg viewBox="0 0 100 100" width="120" height="120">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="10"/>
                            <path d="M50 5 A45 45 0 0 1 95 50" fill="none" stroke="url(#emptyGradient)" stroke-width="10" stroke-linecap="round"/>
                            <defs>
                                <linearGradient id="emptyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#667eea"/>
                                    <stop offset="100%" stop-color="#f093fb"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <p class="empty-text">Add expenses to see your spending breakdown</p>
                    <p class="empty-subtext">Your pie chart will appear here</p>
                </div>
            `;
            return;
        }

        // Re-add canvas if it was replaced
        if (!wrapper.querySelector('#expense-pie-chart')) {
            wrapper.querySelector('.chart-container').innerHTML = `
                <canvas id="expense-pie-chart"></canvas>
                <div class="chart-center-info">
                    <span class="center-label">Total Spent</span>
                    <span class="center-value" id="center-total">₹${totalExpenses.toLocaleString()}</span>
                </div>
            `;
        }

        const canvasEl = wrapper.querySelector('#expense-pie-chart');
        const ctx = canvasEl.getContext('2d');

        const labels = expenses.map(e => e.name);
        const data = expenses.map(e => e.amount);
        const backgroundColor = expenses.map((_, i) => COLORS[i % COLORS.length]);
        const hoverBackgroundColor = expenses.map((_, i) => HOVER_COLORS[i % HOVER_COLORS.length]);

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor,
                    hoverBackgroundColor,
                    borderColor: 'rgba(10, 10, 15, 0.9)',
                    borderWidth: 3,
                    hoverOffset: 20,
                    borderRadius: 6,
                    spacing: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '65%',
                radius: '90%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(20, 20, 30, 0.95)',
                        titleColor: '#fff',
                        titleFont: {
                            size: 14,
                            weight: '600',
                            family: "'Inter', sans-serif"
                        },
                        bodyColor: 'rgba(255, 255, 255, 0.8)',
                        bodyFont: {
                            size: 13,
                            family: "'Inter', sans-serif"
                        },
                        borderColor: 'rgba(102, 126, 234, 0.5)',
                        borderWidth: 1,
                        padding: 16,
                        cornerRadius: 12,
                        displayColors: true,
                        boxWidth: 12,
                        boxHeight: 12,
                        boxPadding: 6,
                        usePointStyle: true,
                        callbacks: {
                            title: function (context) {
                                return context[0].label;
                            },
                            label: function (context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return [
                                    `Amount: ₹${context.parsed.toLocaleString()}`,
                                    `Share: ${percentage}%`
                                ];
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 800,
                    easing: 'easeOutQuart'
                },
                hover: {
                    mode: 'nearest',
                    intersect: true,
                    animationDuration: 200
                }
            }
        });

        // Build custom legend with progress bars
        const total = data.reduce((a, b) => a + b, 0);
        legendContainer.innerHTML = `
            <div class="legend-header">
                <span class="legend-title">Expense Categories</span>
                <span class="legend-count">${expenses.length} items</span>
            </div>
            <div class="legend-items">
                ${expenses.map((e, i) => {
            const percentage = ((e.amount / total) * 100).toFixed(1);
            const salaryPercentage = salary > 0 ? ((e.amount / salary) * 100).toFixed(1) : 0;
            return `
                        <div class="legend-item" data-index="${i}">
                            <div class="legend-item-header">
                                <div class="legend-color-wrapper">
                                    <span class="legend-color" style="background: ${COLORS[i % COLORS.length]}"></span>
                                    <span class="legend-label">${e.name}</span>
                                </div>
                                <span class="legend-amount">₹${e.amount.toLocaleString()}</span>
                            </div>
                            <div class="legend-progress-container">
                                <div class="legend-progress">
                                    <div class="legend-progress-bar" style="width: ${percentage}%; background: ${COLORS[i % COLORS.length]}"></div>
                                </div>
                                <span class="legend-percentage">${percentage}%</span>
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;

        // Add hover effects to legend items
        legendContainer.querySelectorAll('.legend-item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (chartInstance) {
                    chartInstance.setActiveElements([{ datasetIndex: 0, index }]);
                    chartInstance.update();
                }
            });
            item.addEventListener('mouseleave', () => {
                if (chartInstance) {
                    chartInstance.setActiveElements([]);
                    chartInstance.update();
                }
            });
        });
    }

    render();
    document.addEventListener('dataChanged', render);
}
