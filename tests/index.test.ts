// TODO:
import { describe, expect, it } from "bun:test";
import { initJobify } from "index";
import IORedis from "ioredis";

const connection = new IORedis({});

describe("test", () => {
	it("some", () => {
		const defineJob = initJobify(connection);

		const job = defineJob("ok", {
			queue: {
				defaultJobOptions: {
					delay: 100,
				},
			},
		});
	});
});
