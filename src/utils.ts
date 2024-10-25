export type Shift<T extends any[]> = ((...t: T) => void) extends (
	h: any,
	...r: infer R
) => void
	? R
	: never;

export type NoConnection<T> = Omit<T, "connection">;
