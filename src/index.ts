import { monteScheduler } from "./monteScheduler";
import { numberAttendeesScheduled, MeetingList } from "./utils";
import { testCases } from "./testCases";

function testScheduler(
  algorithmName: string,
  algorithm: (meetings: MeetingList) => MeetingList
) {
  console.log(`=== START ${algorithmName} TEST===\n\n`);
  let finalScore = 0;
  const startTime = new Date().getTime();
  for (const [testName, meetings] of Object.entries(testCases)) {
    console.log(`${testName} starting:\n---`);

    const result = algorithm(meetings);
    const attendees = numberAttendeesScheduled(result);
    finalScore += attendees;

    console.log(`Result from ${algorithmName} approach: ${attendees} `);
    console.log(result);

    console.log("\n\n");
  }

  const duration = new Date().getTime() - startTime;

  console.log(`Time elapsed:  ${duration}ms`);
  console.log(`Attendees for all tests: ${finalScore}`);
  console.log(`=== END ${algorithmName} TEST===\n\n`);
}

// TODO: could try testing diff numbers of iterations to see how much
// it would matter
testScheduler("Monte Carlo", monteScheduler);
