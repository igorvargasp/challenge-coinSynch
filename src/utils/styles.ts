type Class = string | undefined | null | false;

export function appendStyles(classes: Class[]) {
	return classes.filter((item) => !!item).join(" ");
}