import { type ConnectionOptions, Queue } from "bullmq";
import { Job } from "define-job";

export function initJobify(connection: ConnectionOptions) {
	return (name: string) => {
		return new Job(connection, name);
	};
}
