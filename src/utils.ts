export type MeetingList = number[][];

export function numberAttendeesScheduled(meetings: MeetingList): number {
  return meetings.reduce((sum, meeting) => {
    return sum + meeting.length;
  }, 0);
}
