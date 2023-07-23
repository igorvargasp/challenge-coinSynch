export function formatDollar(value: number, symbol = false): string {
	const formatter = new Intl.NumberFormat("en", {
		maximumFractionDigits: 3,
		style: symbol ? "currency" : undefined,
		currency: symbol ? "USD" : undefined,
		currencyDisplay: symbol ? "symbol" : undefined,
	});

	const money = formatter.format(value);

	return money;
}