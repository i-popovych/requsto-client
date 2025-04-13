export function getTimeAgo(date: string): string {
  const currentDate = new Date();
  const millisecondsAgo = currentDate.getTime() - new Date(date).getTime();
  const secondsAgo = Math.floor(millisecondsAgo / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const weeksAgo = Math.floor(daysAgo / 7);

  if (weeksAgo >= 2) {
    return `${weeksAgo} weeks ago`;
  } else if (weeksAgo === 1) {
    return `1 week ago`;
  } else if (daysAgo >= 2) {
    return `${daysAgo} days ago`;
  } else if (daysAgo === 1) {
    return `1 day ago`;
  } else if (hoursAgo >= 2) {
    return `${hoursAgo} hours ago`;
  } else if (hoursAgo === 1) {
    return `1 hour ago`;
  } else if (minutesAgo >= 2) {
    return `${minutesAgo} minutes ago`;
  } else {
    return `just now`;
  }
}
