# running

```
yarn
yarn run ts-node src/index.ts
```


# explanation

I started with a pretty simple monte carlo algorithm: randomize the meetings, then greedily add meetings. Instead of a fixed number of runs, I had it stop running after X runs without an improvement. (In order to better optimize cases where the answer is easy, you could have a growing stepdown, where each time it finds a better answer, it gives a little more time to find the next.)

This got some pretty good results up front as Monte Carlo algorithms tend to do. In a sense, one of the weaknesses of this approach is that it may be more difficult for improvements on this to really stand out, unless you're generating test cases which push the limits here.

My next thought was to add a final pass after the monte carlo ran: check through every meeting that was excluded, and see if there were any easy exchanges that would cause a better result. Unfortunately, from a time perspective, there are parts of the data model that I would have loved to improve here (making easy and fast such operations as "can you add meeting X" and "add this meeting in and take this one out"), but ran out of time on refactoring. With more time, I'd love to try starting from a less stochastic approach.