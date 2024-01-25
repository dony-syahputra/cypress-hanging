export const removeExampleFromTitle = (title) => {
  return title.replace(/ \(example #[0-9]+\)$/, '').trim();
};

export const createCommentFromLog = (currentTest, currentTestLogs) => {
  let testStatus = currentTest.state === 'passed' ? 'Pass' : 'Fail';
  let testDuration = currentTest.duration;

  let strLog = '';
  // logs can be also taken from 'this.currentTest.commands' however this only exist when running test via npx cypress open
  for (let i = 0; i < currentTestLogs.length; i++) {
    // only take the 'non-event' and limit 'message' to 100 to avoid credentials in api url being saved
    if (currentTestLogs[i].event != null && !currentTestLogs[i].event) {
      strLog += `<br/> 
          ${currentTestLogs[i].groupStart ? '<br/><B>' : ''}
          ${currentTestLogs[i].type != null && currentTestLogs[i].type === 'child' ? '-> ' : ''}
          ${currentTestLogs[i].name} 
          ${currentTestLogs[i].message.substring(0, 100)}
          ${currentTestLogs[i].groupStart ? '</B>' : ''}`;
    }
  }

  let errMessage = 'No Error';
  if (testStatus === 'Fail') {
    errMessage = currentTest.err.message + '<br/>' + currentTest.err.stack;
  }

  let testComment = `
            <B>Test Result       : </B> ${testStatus} <br/>
            <B>Time Execution    : </B> ${testDuration / 1000} second(s) <br/><br/>
            <B>Error found       : </B> ${errMessage} <br/><br/>
            <B>Video on failure  : </B> TBA <br/>
            <B>SS on failure     : </B> TBA <br/><br/>
            <B>Logs              : </B> ${strLog}`;

  return testComment;
};

export function getLetterFromString(str) {
  return str.match(/[a-z]+/gi).join('');
}

export function getNumberFromString(str) {
  return Number(str.match(/\d+/g).join(''));
}

export function randomNumber() {
  let randomNumber = Math.floor(Math.random() * Math.pow(10, 15));
  let random16DigitNumber = '9' + randomNumber.toString().padStart(15, '0');
  return random16DigitNumber;
}

export function generateRandomLicenseNumber() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomChar1 = characters.charAt(Math.floor(Math.random() * characters.length));
  const randomChar2 = characters.charAt(Math.floor(Math.random() * characters.length));
  const randomNumber = Math.floor(Math.random() * 10000);
  return `WR${randomNumber}${randomChar1}${randomChar2}`;
}
