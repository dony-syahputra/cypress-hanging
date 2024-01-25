const Gherkin = require('@cucumber/gherkin');
const Messages = require('@cucumber/messages');

const uuidFn = Messages.IdGenerator.uuid();
const builder = new Gherkin.AstBuilder(uuidFn);
const matcher = new Gherkin.GherkinClassicTokenMatcher();
const parser = new Gherkin.Parser(builder, matcher);

export default class GherkinDocument {
  constructor(relativeFilePath, fileContent) {
    this.content = parser.parse(fileContent);
    this.pickles = Gherkin.compile(this.content, relativeFilePath, uuidFn);
    this.projectKey = this.pickles[0].tags[0].name.replace('@ProjectKey-', '');
  }

  getScenarioTag(pickle) {
    if (pickle.tags[1]) {
      return pickle.tags[1].name.replace('@', '');
    }
    return null;
  }
}
