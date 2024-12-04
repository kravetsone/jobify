import { describe, expect, it } from "bun:test";
// TODO:
import { Queue } from "bullmq";
import IORedis from "ioredis";
import { initJobify } from "../src/index.js";

const connection = new IORedis({});

describe("test", () => {
	it("some", () => {
		const defineJob = initJobify(connection);

		const job = defineJob("ok", {
			queue: new Queue("ok", { connection }),
		});
	});
});
