cordova.define("cordova/plugin/cachecleaner", function (require, exports, module) {
    var exec = require("cordova/exec");
  module.exports = {
        del: function (win, fail) {
			exec(win, fail, "CacheCleaner", "del", []);
		}
    };
});