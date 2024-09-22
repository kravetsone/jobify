# jobify

<div align="center">

[![npm](https://img.shields.io/npm/v/jobify?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/jobify)
[![JSR](https://jsr.io/badges/jobify)](https://jsr.io/jobify)
[![JSR Score](https://jsr.io/badges/jobify/score)](https://jsr.io/jobify)

</div>

This library is aimed at helping to implement a Webhook server.

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

const job1 = defineJob("some")
    .input<{ date: string }>()
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
```
