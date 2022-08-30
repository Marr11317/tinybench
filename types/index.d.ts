import Task from '../src/task';

/**
 * The task function
 */
export type Fn = () => any | Promise<any>;

/**
 * The benchmark task result object
 */
export type TaskResult = {
  /*
   * The last error that was thrown while running the task
   */
  error?: unknown;

  /**
   * The amount of time in milliseconds to run the benchmark task (cycle).
   */
  totalTime: number;

  /**
   * The minimum value in the samples
   */
  min: number;
  /**
   * The maximum value in the samples
   */
  max: number;

  /**
   * The number of operations per second
   */
  hz: number;

  /**
   * How long each operation takes (ms)
   */
  period: number;

  /**
   * Task samples of each task iteration time (ms)
   */
  samples: number[];

  /**
   * Samples mean/average (estimate of the population mean)
   */
  mean: number;

  /**
   * Samples variance (estimate of the population variance)
   */
  variance: number;

  /**
   * Samples standard deviation (estimate of the population standard deviation)
   */
  sd: number;

  /**
   * Standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean)
   */
  sem: number;

  /**
   * Degrees of freedom
   */
  df: number;

  /**
   * Critical value of the samples
   */
  critical: number;

  /**
   * Margin of error
   */
  moe: number;

  /**
   * Relative margin of error
   */
  rme: number;

  /**
   * p75 percentile
   */
  p75: number;

  /**
   * p99 percentile
   */
  p99: number;

  /**
   * p995 percentile
   */
  p995: number;

  /**
   * p999 percentile
   */
  p999: number;
};

/**
  * Both the `Task` and `Bench` objects extend the `EventTarget` object,
  * So you can attach a listeners to different types of events
  * To each class instance using the universal `addEventListener` and
 * `removeEventListener`
 */

/**
 * Bench events
 */
export type BenchEvents =
  | 'abort' // when a signal aborts
  | 'complete' // when running a benchmark finishes
  | 'error' // when the benchmark task throws
  | 'reset' // when the reset function gets called
  | 'start' // when running the benchmarks gets started
  | 'warmup' // when the benchmarks start getting warmed up (before start)
  | 'cycle' // when running each benchmark task gets done (cycle)
  | 'add' // when a Task gets added to the Bench
  | 'remove'; // when a Task gets removed of the Bench

export type Hook = (task: Task, mode: 'warmup' | 'run') => void | Promise<void>;

type NoopEventListener = () => any | Promise<any>
type TaskEventListener = (e: Event & { task: Task }) => any | Promise<any>

/**
 * All the events that can be listened to from a `Bench`
 * @example `bench.addEventListener('complete', (e) => {...});`
 */
export interface BenchEventsMap{
  abort: NoopEventListener
  start: NoopEventListener
  complete: NoopEventListener
  warmup: NoopEventListener
  reset: NoopEventListener
  add: TaskEventListener
  remove: TaskEventListener
  cycle: TaskEventListener
  error: TaskEventListener
}

/**
 * Task events
 */
export type TaskEvents =
  | 'abort'
  | 'complete'
  | 'error'
  | 'reset'
  | 'start'
  | 'warmup'
  | 'cycle';

/**
 * All the events that can be listened to from a task.
 * @example `task.addEventListener('complete', (e) => {...});`
 */
export type TaskEventsMap = {
  abort: NoopEventListener
  start: TaskEventListener
  error: TaskEventListener
  cycle: TaskEventListener
  complete: TaskEventListener
  warmup: TaskEventListener
  reset: TaskEventListener
}

export type Options = {
  /**
   * Time needed for running a benchmark task (milliseconds) @default 500
   */
  time?: number;

  /**
   * Number of times that a task should run if even the time option is finished @default 10
   */
  iterations?: number;

  /**
   * Function to get the current timestamp in milliseconds
   */
  now?: () => number;

  /**
   * An AbortSignal for aborting the benchmark
   */
  signal?: AbortSignal;

  /**
   * Warmup time (milliseconds) @default 100ms
   */
  warmupTime?: number;

  /**
   * Warmup iterations @default 5
   */
  warmupIterations?: number;

  /**
   * Setup function to run before each benchmark task (cycle)
   */
  setup?: Hook;

  /**
   * Teardown function to run after each benchmark task (cycle)
   */
  teardown?: Hook;
};

export type BenchEvent = Event & {
  task: Task | null;
};
