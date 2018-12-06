# Logger Benchmarks

Problem: What logger is most performant and reliable? Should I use a logger or just write to stdout?

## Metrics

```
console x 8,052 ops/sec ±10.40% (75 runs sampled)
stdout x 28,002 ops/sec ±6.65% (78 runs sampled)
bunyan stdout x 25,653 ops/sec ±8.50% (77 runs sampled)
bunyan rotating file x 167,307 ops/sec ±3.84% (86 runs sampled)
```

Note: bunyan rotating file drops ~67.3k logs out of 167.3k total logs. It does not finish writing all logs until after the tests are finished running.

