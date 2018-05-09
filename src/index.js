const moment = require('moment');

const _getTimestamp = () => moment.format();

export default function () {
  return {
    noColors: false,
    startTime: null,
    afterErrorList: false,
    testCount: 0,
    skipped: 0,

    reportTaskStart(startTime, userAgents, testCount) {
      this.startTime = startTime;
      this.testCount = testCount;

      this.setIndent(1)
        .useWordWrap(true)
        .write(this.chalk.bold(_getTimestamp()))
        .write(this.chalk.bold('Running tests in:'))
        .newline();

      userAgents.forEach((ua) => {
        this
          .write(`- ${this.chalk.blue(ua)}`)
          .newline();
      });
    },

    reportFixtureStart(name) {
      this.setIndent(1)
        .useWordWrap(true);

      if (this.afterErrorList) {
        this.afterErrorList = false;
      } else {
        this.newline();
      }
      this.write(this.chalk.bold(_getTimestamp()))
        .write(name)
        .newline();
    },

    _renderErrors(errs) {
      this.setIndent(3)
        .newline();

      errs.forEach((err, idx) => {
        const prefix = this.chalk.red(`${idx + 1}) `);

        this.newline()
          .write(this.formatError(err, prefix))
          .newline()
          .newline();
      });
    },

    reportTestDone(name, testRunInfo) {
      const hasErr = !!testRunInfo.errs.length;
      const now = _getTimestamp();
      let symbol = null;
      let nameStyle = null;

      if (testRunInfo.skipped) {
        this.skipped++;
        symbol = this.chalk.cyan('-');
        nameStyle = this.chalk.cyan;
      } else if (hasErr) {
        symbol = this.chalk.red.bold(this.symbols.err);
        nameStyle = this.chalk.red.bold;
      } else {
        symbol = this.chalk.green(this.symbols.ok);
        nameStyle = this.chalk.grey;
      }

      let title = `${this.chalk.bold(now)} ${symbol} ${nameStyle(name)}`;

      this.setIndent(1)
        .useWordWrap(true);

      if (testRunInfo.unstable) {
        title += this.chalk.yellow(' (unstable)');
      }

      if (testRunInfo.screenshotPath) {
        title += ` (screenshots: ${this.chalk.underline.grey(testRunInfo.screenshotPath)})`;
      }

      this.write(title);

      if (hasErr) {
        this._renderErrors(testRunInfo.errs);
      }

      this.afterErrorList = hasErr;

      this.newline();
    },

    _renderWarnings(warnings) {
      this.newline()
        .write(this.chalk.bold(_getTimestamp()))
        .setIndent(1)
        .write(this.chalk.bold.yellow(`Warnings (${warnings.length}):`))
        .newline();

      warnings.forEach((msg) => {
        this.setIndent(1)
          .write(this.chalk.bold.yellow('--'))
          .newline()
          .setIndent(2)
          .write(msg)
          .newline();
      });
    },

    reportTaskDone(endTime, passed, warnings) {
      const durationMs = endTime - this.startTime;
      const durationStr = this.moment.duration(durationMs).format('h[h] mm[m] ss[s]');
      let footer = passed === this.testCount ?
        this.chalk.bold.green(`${this.testCount} passed`) :
        this.chalk.bold.red(`${this.testCount - passed}/${this.testCount} failed`);

      footer += this.chalk.grey(` (${durationStr})`);

      if (!this.afterErrorList) {
        this.newline();
      }
      this.write(this.chalk.bold(_getTimestamp()))
        .setIndent(1)
        .useWordWrap(true);

      this.newline()
        .write(footer)
        .newline();

      if (this.skipped > 0) {
        this.write(this.chalk.cyan(`${this.skipped} skipped`))
          .newline();
      }

      if (warnings.length) {
        this._renderWarnings(warnings);
      }
    }
  };
}
