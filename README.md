# jobify

<div align="center">

[![npm](https://img.shields.io/npm/v/jobify?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/jobify)
[![npm downloads](https://img.shields.io/npm/dw/jobify?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/jobify)
[![JSR](https://jsr.io/badges/@kravets/jobify)](https://jsr.io/@kravets/jobify)
[![JSR Score](https://jsr.io/badges/@kravets/jobify/score)](https://jsr.io/@kravets/jobify)

</div>

Type-safe and much simpler wrapper for the [BullMQ](https://bullmq.io/) library.

> [!WARNING]
> This project is in the `MVP` state and the API may still change a lot. At the moment, the project fits the
> requirements of the project rather than general purpose

# Usage

```ts
import { initJobify } from "jobify";
import IORedis from "ioredis";

const redis = new IORedis({
    maxRetriesPerRequest: null,
});

const defineJob = initJobify(redis);

const job1 = defineJob("some", {
    queue: {
        defaultJobOptions: {
            delay: 100,
        },
    },
})
    .input<{ date: string }>()
    // WORKER OPTIONS
    .options({
        limiter: {
            max: 10,
            duration: 1000,
        },
    })
    .action(async (job) => {
        console.log("running", job.data.date);
        //       ^?
    });

await job1.add(
    "some",
    { date: new Date().toISOString() },
    {
        delay: 5000,
    }
);

const job2 = await defineJob("some-cron")
    .input<{ date: string }>()
    .action(async (job) => {
        console.log("running", job.data.date);
        //       ^?
    })
    // it will run every minute and will not be duplicated during reboots.
    .repeatable({
        every: 60 * 1000,
    });
```

## Workers defaults

We add some options by default to Workers

```ts
{
    removeOnComplete: {
		count: 20,
	},
	removeOnFail: {
		age: 24 * 3600,
		count: 1000,
    }
}
```

We add it because it recommended in [`going to production`](https://docs.bullmq.io/guide/going-to-production#auto-job-removal)

### TODO:

-   maybe [pg-boss](https://github.com/timgit/pg-boss) adapter?
-   hooks?
-   make job title optional?
-   guide with [bull-board](https://github.com/felixmosh/bull-board) and some improves for usage
