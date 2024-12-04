import type { ConnectionOptions } from "bullmq";
import { Job } from "./define-job.js";
import type { Shift } from "./utils.js";

export * from "./define-job.js";

export function initJobify(connection: ConnectionOptions) {
	return (...args: Shift<ConstructorParameters<typeof Job>>) => {
		return new Job(connection, ...args);
	};
}
