import {
	type ConnectionOptions,
	type JobsOptions,
	type Processor,
	Queue,
	Worker,
	type WorkerOptions,
} from "bullmq";

export class Job<GlobalInput = never> {
	private connection: ConnectionOptions;
	private name: string;
	queue: Queue<GlobalInput>;
	// TODO: depends on generic
	worker!: Worker<GlobalInput>;
	private optionsData?: Omit<WorkerOptions, "connection">;

	constructor(connection: ConnectionOptions, jobName: string) {
		this.connection = connection;
		this.name = jobName;

		this.queue = new Queue(jobName, {
			connection,
		});
	}

	input<Input>(input?: Input): Job<Input> {
		// @ts-expect-error
		return this;
	}

	options(options: typeof this.optionsData) {
		this.optionsData = options;

		return this;
	}

	action(action: Processor<GlobalInput, any, string>) {
		this.worker = new Worker(this.name, action, {
			...this.optionsData,
			connection: this.connection,
		});

		return this;
	}

	// additions

	add(name: string, input: GlobalInput, options?: JobsOptions) {
		return this.queue.add(name, input, options);
	}
	addBulk(jobs: { name: string; data: GlobalInput; opts?: JobsOptions }[]) {
		return this.queue.addBulk(jobs);
	}
}
