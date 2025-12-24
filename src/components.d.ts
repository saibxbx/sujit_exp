// components.d.ts
// TypeScript module declarations for JavaScript component files

declare module './components/entryForm.js' {
    export function renderEntryForm(container: HTMLElement): void;
}
declare module './components/summary.js' {
    export function renderSummary(container: HTMLElement): void;
}
declare module './components/filter.js' {
    export function renderFilter(container: HTMLElement): void;
}
declare module './components/chart.js' {
    export function renderChart(container: HTMLElement): void;
}

