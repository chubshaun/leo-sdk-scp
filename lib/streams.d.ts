
import moment from 'moment';
import stream from 'stream';
import through2 from 'through2';
import pump from "pump";
import { ParserOptionsArgs } from 'fast-csv';
import { ErrorCallback, DataCallback, Event, FlushCallback, ReadEvent, TransformFunction, ReadableStream, WritableStream, TransformStream } from "./types";

declare type ProcessCallback<T> = (err?: any, result?: boolean | T, opts?: ProcessCallbackOptions) => void;
declare type ProcessFunction<T, U> = (payload: T, wrapper: ReadEvent<T>, callback: ProcessCallback<U>) => void;
declare type CommandWrapFunction<T, U = any> = (
	obj: T,
	done: (err?: any, result?: U) => void,
	push: (data: U) => void
) => void;

export interface ProcessCallbackOptions {
	queue?: string;
	event_source_timestamp?: number;
	event?: string;
	eid?: string;
	units?: number;
}

export interface CommandWrapOptions {
	hasCommands?: string;
	ignoreCommands?: string[];
}

// export interface AsEventOptions {}
//export default interface Streams {
//export function pipe(streams: stream.Transform[], callback?: pump.Callback): stream.Transform;
//export function pipe(...streams: Array<stream.Transform | pump.Callback>): stream.Transform;


export function pipe<T1>(read: ReadableStream<T1>, write: WritableStream<T1> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T1> | stream.Writable;
export function pipe<T1, T2>(read: ReadableStream<T1>, t1: TransformStream<T1, T2>, write: WritableStream<T2> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T2> | stream.Writable;
export function pipe<T1, T2, T3>(read: ReadableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, write: WritableStream<T3> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T3> | stream.Writable;
export function pipe<T1, T2, T3, T4>(read: ReadableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, write: WritableStream<T4> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T4> | stream.Writable;
export function pipe<T1, T2, T3, T4, T5>(read: ReadableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, t4: TransformStream<T4, T5>, write: WritableStream<T5> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T5> | stream.Writable;
export function pipe<T1, T2, T3, T4, T5, T6>(read: ReadableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, t4: TransformStream<T4, T5>, t5: TransformStream<T5, T6>, write: WritableStream<T6> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T6> | stream.Writable;


export function pipeAsync<T1>(read: ReadableStream<T1>, write: WritableStream<T1>): Promise<void>;
export function pipeAsync<T1, T2>(read: ReadableStream<T1>, t1: TransformStream<T1, T2>, write: WritableStream<T2>): Promise<void>;
export function pipeAsync<T1, T2, T3>(read: ReadableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, write: WritableStream<T3>): Promise<void>;
export function pipeAsync<T1, T2, T3, T4>(read: ReadableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, write: WritableStream<T4>): Promise<void>;
export function pipeAsync<T1, T2, T3, T4, T5>(read: ReadableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, t4: TransformStream<T4, T5>, write: WritableStream<T5>): Promise<void>;
export function pipeAsync<T1, T2, T3, T4, T5, T6>(read: ReadableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, t4: TransformStream<T4, T5>, t5: TransformStream<T5, T6>, write: WritableStream<T6>): Promise<void>;

// export function pipe<T1>(read: ReadableStream<T1> | stream.Readable, write: WritableStream<T1> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T1>;
// export function pipe<T1, T2>(read: ReadableStream<T1> | stream.Readable, t1: TransformStream<T1, T2>, write: WritableStream<T2> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T2>;
// export function pipe<T1, T2, T3>(read: ReadableStream<T1> | stream.Readable, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, write: WritableStream<T3> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T3>;
// export function pipe<T1, T2, T3, T4>(read: ReadableStream<T1> | stream.Readable, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, write: WritableStream<T4> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T4>;
// export function pipe<T1, T2, T3, T4, T5>(read: ReadableStream<T1> | stream.Readable, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, t4: TransformStream<T4, T5>, write: WritableStream<T5> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T5>;
// export function pipe<T1, T2, T3, T4, T5, T6>(read: ReadableStream<T1> | stream.Readable, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, t4: TransformStream<T4, T5>, t5: TransformStream<T5, T6>, write: WritableStream<T6> | stream.Writable, errorCallback?: ErrorCallback): WritableStream<T6>;

//export function pipe(...args:(ReadableStream<any>|TransformStream<any,any>|WritableStream<any>)[])

export function pipeline<T1, D extends WritableStream<T1>>(write: WritableStream<T1>, drain: D, errorCallback?: ErrorCallback): D extends ReadableStream<infer U> ? TransformStream<T1, U> : WritableStream<T1>;
export function pipeline<T1, T2, D extends WritableStream<T2>>(write: WritableStream<T1>, t1: TransformStream<T1, T2>, t2: D, errorCallback?: ErrorCallback): D extends ReadableStream<infer U> ? TransformStream<T1, U> : WritableStream<T1>;
export function pipeline<T1, T2, T3, D extends WritableStream<T3>>(write: WritableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: D, errorCallback?: ErrorCallback): D extends ReadableStream<infer U> ? TransformStream<T1, U> : WritableStream<T1>;
export function pipeline<T1, T2, T3, T4, D extends WritableStream<T4>>(write: WritableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, t4: D, errorCallback?: ErrorCallback): D extends ReadableStream<infer U> ? TransformStream<T1, U> : WritableStream<T1>;
export function pipeline<T1, T2, T3, T4, T5, D extends WritableStream<T5>>(write: WritableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, t4: TransformStream<T4, T5>, t5: D, errorCallback?: ErrorCallback): D extends ReadableStream<infer U> ? TransformStream<T1, U> : WritableStream<T1>;
export function pipeline<T1, T2, T3, T4, T5, T6, D extends WritableStream<T6>>(write: WritableStream<T1>, t1: TransformStream<T1, T2>, t2: TransformStream<T2, T3>, t3: TransformStream<T3, T4>, t4: TransformStream<T4, T5>, t5: TransformStream<T5, T6>, t6: D, errorCallback?: ErrorCallback): D extends ReadableStream<infer U> ? TransformStream<T1, U> : WritableStream<T1>;


export function eventIdFromTimestamp(timestamp: moment.MomentInput, granularity?: string): string;
export function eventIdToTimestamp(eid: string): number;
export function commandWrap<T, U>(opts: CommandWrapOptions, func: CommandWrapFunction<T, U>): TransformFunction;
export function bufferBackoff<T>(each, emit, retryOpts, opts, flush): WritableStream<T>;

//asEvent: (opts: AsEventOptions):stream.Transform;
export function log<T>(prefix?: string): TransformStream<T, T>;
export function devnull<T>(shouldLog?: boolean | string): WritableStream<T>;
export function counter<T>(label: string, records?: number): TransformStream<T, T>;
export function counter<T>(records?: number): TransformStream<T, T>;
export function process<T, U>(id: string, func: ProcessFunction<T, U>, outQueue: string): TransformStream<T, U>;
export function batch<T>(opts: BatchOptions | Number): TransformStream<T, ReadEvent<ReadEvent<T>[]>>;

export function passthrough<T, U>(opts?: stream.TransformOptions): TransformStream<T, U>;
//export function through(transform?: through2.TransformFunction, flush?: through2.FlushCallback): stream.Transform;
export function through<T, U>(transform?: (this: TransformStream<T, U>, obj: T, done: DataCallback<U>) => void, flush?: FlushCallback<U>): TransformStream<T, U>;
export function throughAsync<T, U>(transform?: (this: TransformStream<T, U>, obj: T) => Promise<U> | U, flush?: (this: TransformStream<T, U>) => Promise<U> | U): TransformStream<T, U>;

export function writeWrapped<T>(opts: CommandWrapOptions | any, func: CommandWrapFunction<T, any>, flush?: through2.FlushCallback): WritableStream<T>;
export function writeWrapped<T>(func: CommandWrapFunction<T, any>, flush?: through2.FlushCallback): WritableStream<T>;
//cmd(watchCommands, singleFunc):stream.Transform;
export function buffer(opts, each, emit, flush): stream.Transform;
//cmdFlush(obj, done):stream.Transform;
export function stringify(): TransformStream<any, string>;
export function parse(skipErrors?: boolean): stream.Transform;

/**
 * @param {boolean|list} fieldList - List of fields to transform | true builds the header list dynmaically
 * @param {ToCsvOptions} opts - fastCSV options https://c2fo.github.io/fast-csv/docs/parsing/options
 */
export function toCSV(fieldList: boolean | string[], opts?: ToCsvOptions): TransformStream<any, any>;
export function fromCSV(fieldList: boolean | string[], opts?: FromCsvOptions): TransformStream<any, any>;

export function toS3(Bucket: string, File: string): WritableStream<any>;
export function fromS3(file: {
	bucket: string,
	key: string;
	range?: string;
}): WritableStream<any>;
//}

export interface FromCsvOptions extends ParserOptionsArgs { }

export interface ToCsvOptions {
	delimiter?: string;
	escape?: string;
	quote?: string;
	nullValue?: any;
}

/**
 * Used in pipeline operations to tell the SDK to micro-batch events received in one pipeline step
 * before sending them to the next pipeline step.
 * 
 * The SDK will send events to the next pipeline step as soon as one of the `count`, `bytes` or 
 * `time` constraints are met.
 * 
 * @see [[`EnrichOptions.batch`]] Good doc on using this.
 * @todo review Is this doc right?
 * @todo review these were commented out, are they really there and should be deprecated? //records: Number; // same as count //size: Number; // Same as bytes
 */
export interface BatchOptions {
	/** The number of events to micro-batch before sending them to the next step in the pipeline */
	count?: Number;
	
	/**
	 * The number of bytes of events to micro-batch up before sending them to the next step in the pipeline 
	 * 
	 * @see [[`BatchOptions.field`]]
	 */
	bytes?: Number;
	
	/** 
	 * The amount of time to wait, micro-batching events up before sending them to the next step in the pipeline 
	 * 
	 * Note, this type is any one of the [valid durations the Moment JS library](https://momentjs.com/docs/#/durations/)
	 * can take: Duration | number | string | FromTo | DurationInputObject.
	 * 
	 * @todo question Need examples of what this can take?  Cool moment things used for example.  Is this ms?
	 */
	time?: moment.DurationInputArg1;

	/**
	 * If micro-batching on number of bytes, then you may optionally set this to be the name of the field
	 * in the event that you wish to have used exclusively to count towards to the total number of bytes.
	 * This isn't used except in uncommon circumstances where one field alone should control the 
	 * micro-batching since its size will impact the amount of time the next pipeline step takes to proces.
	 * 
	 * @see [[`BatchOptions.bytes`]]
	 * @todo review
	 */
	field?: string;
}
