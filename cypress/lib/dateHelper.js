// Returns date in UTC ISO Format on the first previous Saturday from the current Date.
// i.e currentDate is 02 Nov 2023 then startDate is 28 Oct 2023
export function getStartDateInISOFormat() {
  const dateTime = new Date();

  // Setelah ini, dateTime akan memiliki tanggal pada awal minggu berjalan.
  dateTime.setUTCDate(dateTime.getUTCDate() - dateTime.getUTCDay());

  // Set the time to 00:00:00.000
  dateTime.setUTCHours(0);
  dateTime.setUTCMinutes(0);
  dateTime.setUTCSeconds(0);
  dateTime.setUTCMilliseconds(0);

  // Returns time in fixed UTC ISO format of 00:00:00.000 at the start of the current week
  // example output: 2023-11-19T00:00:00.000Z -> 19 Nov 2023, 00:00:00
  return dateTime.toISOString();
}

// Returns date in UTC ISO Format on the first next Saturday from the current Date.
// i.e currentDate is 02 Nov 2023 then startDate is 04 Nov 2023
export function getEndDateInISOFormat() {
  const dateTime = new Date();
  switch (dateTime.getUTCDay()) {
    case 0:
      dateTime.setUTCDate(dateTime.getUTCDate() + 6);
      break;
    case 1:
      dateTime.setUTCDate(dateTime.getUTCDate() + 5);
      break;
    case 2:
      dateTime.setUTCDate(dateTime.getUTCDate() + 4);
      break;
    case 3:
      dateTime.setUTCDate(dateTime.getUTCDate() + 3);
      break;
    case 4:
      dateTime.setUTCDate(dateTime.getUTCDate() + 2);
      break;
    case 5:
      dateTime.setUTCDate(dateTime.getUTCDate() + 1);
      break;
    case 6:
      dateTime.setUTCDate(dateTime.getUTCDate() - 0);
      break;
  }

  // Set the time to 00:00:00.000
  dateTime.setUTCHours(0);
  dateTime.setUTCMinutes(0);
  dateTime.setUTCSeconds(0);
  dateTime.setUTCMilliseconds(0);

  // Returns time in fixed UTC ISO format of 00:00:00.000 on the next day
  // example output: 2023-11-05T00:00:00.000Z -> 5 Nov 2023, 00:00:00
  return dateTime.toISOString();
}
