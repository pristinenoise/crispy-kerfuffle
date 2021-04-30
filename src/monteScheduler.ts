import * as _ from "lodash";
import { MeetingList, numberAttendeesScheduled } from "./utils";

export function monteScheduler(meetings: MeetingList): MeetingList {
  let bestNumAttendees = 0;
  let bestSchedule: MeetingList = [];
  // stop when the last 500 times haven't beaten the current best
  const triesBeforeGivingUp = 500;

  // very naive approach, shuffle list, greedily pick non-conflict meetings
  let triesLeft = triesBeforeGivingUp;

  while (triesLeft > 0) {
    triesLeft -= 1;
    const shuffledMeetings = _.shuffle(meetings);
    const usersAttending = new Set<number>();

    const schedule = shuffledMeetings.reduce((res, meeting) => {
      const usersInMeeting = meeting.length;
      for (let i = 0; i < usersInMeeting; i++) {
        if (usersAttending.has(meeting[i])) {
          // skip this meeting and try next one if conflict
          return res;
        }
      }

      // this meeting doesn't conflict, add it
      res.push(meeting);

      for (let i = 0; i < usersInMeeting; i++) {
        usersAttending.add(meeting[i]);
      }

      return res;
    }, [] as MeetingList);

    const numAttendees = numberAttendeesScheduled(schedule);

    if (numAttendees > bestNumAttendees) {
      bestSchedule = schedule;
      bestNumAttendees = numAttendees;
      // reset our try counter
      triesLeft = triesBeforeGivingUp;
    }
  }

  return bestSchedule;
}
