import { dev } from '$app/environment';

export enum State {
	'NotStarted' = 'NotStarted',
	'Working' = 'Working',
	'Chilling' = 'Chilling'
}

export const IDB_KEY_FORMAT = 'yyyy_MM_dd';
export const PRINT_FORMAT = dev ? 'hh:mm:ss' : 'hh:mm';

export const STATE_SYMBOL = {
	[State.NotStarted]: '🛏',
	[State.Working]: '🛠️',
	[State.Chilling]: '☕'
};
