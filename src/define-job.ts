import {
	type ConnectionOptions,
	type JobsOptions,
	type Processor,
	Queue,
	type QueueOptions,
	type RepeatOptions,
	Worker,
	type WorkerOptions,
} from "bullmq";
import type { NoConnection } from "./utils";

export type OptionsData = NoConnection<WorkerOptions>;

export interface DefinedJobsOptions {
	queue?: Queue | NoConnection<QueueOptions>;
}

export class Job<GlobalInput = undefined> {
	private connection: ConnectionOptions;
	private name: string;
	queue: Queue<GlobalInput>;
	// TODO: depends on generic
	worker!: Worker<GlobalInput>;
	private optionsData?: OptionsData;

	constructor(
		connection: ConnectionOptions,
		jobName: string,
		options?: DefinedJobsOptions,
	) {
		this.connection = connection;
		this.name = jobName;

		// @ts-expect-error
		this.queue =
			options?.queue instanceof Queue
				? options.queue
				: new Queue(jobName, {
						connection,
						...options?.queue,
					});
	}

	input<Input>(input?: Input): Job<Input> {
		// @ts-expect-error
		return this;
	}

	options(options: OptionsData) {
		this.optionsData = options;

		return this;
	}

	action(action: Processor<GlobalInput, any, string>) {
		this.worker = new Worker(this.name, action, {
			removeOnComplete: {
				count: 20,
			},
			removeOnFail: {
				age: 24 * 3600,
				count: 1000,
			},
			...this.optionsData,

			connection: this.connection,
		});

		return this;
	}

	// additions

	add(name: string, input: GlobalInput, options?: JobsOptions) {
		// @ts-expect-error
		return this.queue.add(name, input, options);
	}

	addBulk(jobs: { name: string; data: GlobalInput; opts?: JobsOptions }[]) {
		// @ts-expect-error
		return this.queue.addBulk(jobs);
	}

	async repeatable(
		repeatable: RepeatOptions,
		data?: GlobalInput | undefined,
		options?: JobsOptions,
	) {
		// @ts-expect-error
		await this.queue.add(this.name, data, {
			...options,
			repeat: { key: this.name, ...repeatable },
		});

		return this;
	}
}
