import { describe, expect, it } from "bun:test";
// TODO:
import { Queue } from "bullmq";
import { initJobify } from "index";
import IORedis from "ioredis";

const connection = new IORedis({});

describe("test", () => {
	it("some", () => {
		const defineJob = initJobify(connection);

		const job = defineJob("ok", {
			queue: new Queue("ok", { connection }),
		});
	});
});
