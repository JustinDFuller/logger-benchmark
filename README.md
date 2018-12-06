# Logger Benchmarks

Problem: What logger is most performant and reliable? Should I use a logger or just write to stdout?

## Metrics

```
debug x 7,161 ops/sec ±5.66% (76 runs sampled)
console x 8,052 ops/sec ±10.40% (75 runs sampled)
logda x 16,465 ops/sec ±8.22% (79 runs sampled)
bunyan stdout x 25,653 ops/sec ±8.50% (77 runs sampled)
stdout x 28,002 ops/sec ±6.65% (78 runs sampled)
bunyan rotating file x 167,307 ops/sec ±3.84% (86 runs sampled)
```

__Note:__ bunyan rotating file drops ~67.3k logs out of 167.3k total logs. It does not finish writing all logs until after the tests are finished running. For this reason I consider it to be totally unreliable.

## Other notes

Why not winston? Because it's not designed to be parseable - it's designed to be human readable. It might be useful for some cases but it's bad for server logs.

## Recommendation?

At this point I recommend pointing logs directly to stdout (and possibly stderr for error logs, although it is slower). Then you should use a native solution like `logrotate` on linux or a platform solution like AWS Cloudwatch.
