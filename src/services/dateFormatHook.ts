import moment from 'moment';

export function formatDate(date: moment.MomentInput) {
  const now = moment();
  const givenDate = moment(date);

  //   return only time if it's today.
  if (now.isSame(givenDate, 'day')) {
    return givenDate.format('HH:mm');
  }

  //   return 'yesterday' if it's yesterday.
  if (now.subtract(1, 'days').isSame(givenDate, 'day')) {
    return 'Yesterday';
  }

  //   return date(yyyy-mm-dd) if it's last week.
  const startOfWeek = now.clone().startOf('week');
  const endOfWeek = now.clone().endOf('week');

  if (
    givenDate.isBetween(
      startOfWeek.subtract(1, 'week'),
      endOfWeek.subtract(1, 'week'),
      null,
      '[]'
    )
  ) {
    return givenDate.format('YYYY-MM-DD');
  }

  //   return day options e.g Monday, Tuesday...
  return givenDate.format('dddd');
}
