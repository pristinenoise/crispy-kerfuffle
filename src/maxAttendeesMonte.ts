import * as _ from "lodash";
import { MeetingList, numberAttendeesScheduled } from "./utils";

export function maxAttendeesMonte(meetings: MeetingList): MeetingList {
  let bestNumAttendees = 0;
  let bestSchedule: MeetingList = [];

  // very naive approach, shuffle list, greedily pick non-conflict meetings
  // try 100 times for best

  for (let times = 0; times < 100; times++) {
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
    }
  }

  return bestSchedule;
}
