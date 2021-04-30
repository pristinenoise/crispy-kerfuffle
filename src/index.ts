import { maxAttendeesMonte } from "./maxAttendeesMonte";
import { numberAttendeesScheduled, MeetingList } from "./utils";
import { testCases } from "./testCases";

function testScheduler(
  algorithmName: string,
  algorithm: (meetings: MeetingList) => MeetingList
) {
  console.log(`=== START ${algorithmName} TEST===\n\n`);
  const startTime = new Date().getTime();
  for (const [testName, meetings] of Object.entries(testCases)) {
    console.log(`${testName} starting:\n---`);

    const result = algorithm(meetings);

    console.log(
      `Result from ${algorithmName} approach: ${numberAttendeesScheduled(
        result
      )} `
    );
    console.log(result);

    console.log("\n\n");
  }

  const duration = new Date().getTime() - startTime;

  console.log(`Time elapsed:  ${duration}ms`);
  console.log(`=== END ${algorithmName} TEST===\n\n`);
}

testScheduler("Monte Carlo", maxAttendeesMonte);
