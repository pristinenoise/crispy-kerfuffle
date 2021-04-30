import * as _ from "lodash";
import { MeetingList, numberAttendeesScheduled } from "./utils";

export function montePlusPassScheduler(meetings: MeetingList): MeetingList {
  let bestNumAttendees = 0;
  let bestMeetingsIncluded: number[] = [];
  let bestMeetingsExcluded: number[] = [];
  let bestSchedule: MeetingList = [];
  // stop when the last 500 times haven't beaten the current best
  const triesBeforeGivingUp = 500;

  // list of which meetings conflict with each other
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const conflictList: Record<number, number[]> = findConflicts(meetings);

  // build a map of which

  // very naive approach, shuffle list, greedily pick non-conflict meetings
  let triesLeft = triesBeforeGivingUp;

  while (triesLeft > 0) {
    triesLeft -= 1;
    const shuffledMeetings = _.shuffle(meetings);
    const usersAttending = new Set<number>();
    const includedMeetings: number[] = [];
    const excludedMeetings: number[] = [];

    const schedule: MeetingList = [];
    for (const [mtgIndex, meeting] of shuffledMeetings.entries()) {
      const usersInMeeting = meeting.length;
      let conflict = false;
      for (let i = 0; i < usersInMeeting; i++) {
        if (usersAttending.has(meeting[i])) {
          // skip this meeting and try next one if conflict
          excludedMeetings.push(mtgIndex);
          conflict = true;
        }
      }

      if (conflict) {
        continue;
      }

      // this meeting doesn't conflict, add it
      includedMeetings.push(mtgIndex);
      schedule.push(meeting);

      for (let i = 0; i < usersInMeeting; i++) {
        usersAttending.add(meeting[i]);
      }
    }

    const numAttendees = numberAttendeesScheduled(schedule);

    if (numAttendees > bestNumAttendees) {
      bestSchedule = schedule;
      bestMeetingsExcluded = excludedMeetings;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      bestMeetingsIncluded = includedMeetings;
      bestNumAttendees = numAttendees;
      // reset our try counter
      triesLeft = triesBeforeGivingUp;
    }
  }

  // now try to see if there's any easy fixes of exchanging one meeting for another

  let tryMeetingSwitches = true;
  while (tryMeetingSwitches) {
    // if we don't find any better switches, we're done
    tryMeetingSwitches = false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const mtgIndex in bestMeetingsExcluded) {
      // find the meetings it conflicts with
      // for (const conflict in conflictList[mtgIndex]) {
      // if (mtgIndex) {
      // }
      // }
    }
  }

  return bestSchedule;
}

function findConflicts(meetings: MeetingList): Record<number, number[]> {
  const meetingsByUser: Record<number, number[]> = {};

  // loop through and figure out what meetings each person is in
  for (const [mtgIndex, meeting] of meetings.entries()) {
    meeting.forEach((user) => {
      if (meetingsByUser[user] == undefined) {
        meetingsByUser[user] = [];
      }

      meetingsByUser[user].push(mtgIndex);
    });
  }

  const conflicts: Record<number, number[]> = {};

  for (const [mtgIndex, meeting] of meetings.entries()) {
    conflicts[mtgIndex] = [];
    let allMeetingsForUsers: number[] = [];

    for (const user in meeting) {
      allMeetingsForUsers = allMeetingsForUsers.concat(meetingsByUser[user]);
    }

    // the conflicts are the meeting ids which don't match our current
    // index (also eliminating duplicates)
    conflicts[mtgIndex] = _.uniq(allMeetingsForUsers).filter((idx) => {
      return idx != mtgIndex;
    });
  }

  return conflicts;
}
