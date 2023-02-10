import { entries, get, set } from 'idb-keyval';
import { DateTime, Duration, Interval } from 'luxon';
import { IDB_KEY_FORMAT, PRINT_FORMAT } from './constants';

type WorkRecord = { isWorking: boolean; timestamp: DateTime };
type SerializedWorkRecord = {
	isWorking: boolean;
	timestamp: number;
};

const serializeWorkRecords = (workRecords: WorkRecord[]): SerializedWorkRecord[] => {
	return workRecords.map((workRecord) => ({
		isWorking: workRecord.isWorking,
		timestamp: workRecord.timestamp.toMillis()
	}));
};

const restoreWorkRecords = (serializedWorkRecords: SerializedWorkRecord[]): WorkRecord[] => {
	return serializedWorkRecords.map((workRecord) => ({
		isWorking: workRecord.isWorking,
		timestamp: DateTime.fromMillis(workRecord.timestamp)
	}));
};

const readWorkRecords = async (date = DateTime.now().toFormat(IDB_KEY_FORMAT)) =>
	(await get(date)) ?? [];

type SerializedDayJournal = [string, SerializedWorkRecord[]];
type DayJournal = [string, WorkRecord[]];

const readAllDays = async (): Promise<DayJournal[]> => {
	const serializedJournal: SerializedDayJournal[] = await entries();
	return serializedJournal.map((serializedDayJournal) => [
		serializedDayJournal[0],
		restoreWorkRecords(serializedDayJournal[1])
	]);
};

const addWorkRecord = (workRecords: WorkRecord[], isWorking: boolean) => {
	const newWorkRecord = { isWorking, timestamp: DateTime.now() };
	workRecords.push(newWorkRecord);
	set(DateTime.now().toFormat(IDB_KEY_FORMAT), serializeWorkRecords(workRecords));
	return workRecords;
};

const resetDayRecords = (date = DateTime.now().toFormat(IDB_KEY_FORMAT)) => set(date, []);

const workRecordsReducer = (
	duration: Duration,
	workRecord: WorkRecord,
	currentIndex: number,
	workRecords: WorkRecord[]
) => {
	if (workRecord.isWorking) {
		const currentInterval = Interval.fromDateTimes(workRecord.timestamp, DateTime.now());
		return currentIndex === workRecords.length - 1
			? duration.plus(currentInterval.toDuration())
			: duration;
	}

	const lastWorkingInterval = Interval.fromDateTimes(
		workRecords[currentIndex - 1].timestamp,
		workRecord.timestamp
	);
	return duration.plus(lastWorkingInterval.toDuration());
};

const pauseRecordsReducer = (
	duration: Duration,
	workRecord: WorkRecord,
	currentIndex: number,
	workRecords: WorkRecord[]
) => {
	const previousRecord = workRecords[currentIndex - 1];
	if (!workRecord.isWorking || !previousRecord || (previousRecord && previousRecord?.isWorking))
		return duration;
	return duration.plus(
		Interval.fromDateTimes(previousRecord.timestamp, workRecord.timestamp).toDuration()
	);
};

const getWorkDuration = (workRecords: WorkRecord[]) =>
	workRecords.reduce(workRecordsReducer, Duration.fromMillis(0)).toFormat(PRINT_FORMAT);

const getPauseDuration = (workRecords: WorkRecord[]) =>
	workRecords.reduce(pauseRecordsReducer, Duration.fromMillis(0)).toFormat(PRINT_FORMAT);

export {
	addWorkRecord,
	readAllDays,
	serializeWorkRecords,
	restoreWorkRecords,
	readWorkRecords,
	resetDayRecords,
	getWorkDuration,
	getPauseDuration,
	type WorkRecord,
	type SerializedWorkRecord
};
