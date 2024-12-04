import type { ConnectionOptions } from "bullmq";
import { Job } from "./define-job";
import type { Shift } from "./utils";

export * from "./define-job"

export function initJobify(connection: ConnectionOptions) {
	return (...args: Shift<ConstructorParameters<typeof Job>>) => {
		return new Job(connection, ...args);
	};
}
