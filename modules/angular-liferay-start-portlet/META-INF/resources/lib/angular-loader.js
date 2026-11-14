"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/es7/reflect");
require("zone.js/dist/zone");
function default_1(rootId) {
    Liferay.Loader.require('angular-liferay-start-portlet@1.0.0/lib/main', function (main) {
        main.default(rootId);
    });
}
exports.default = default_1;
//# sourceMappingURL=angular-loader.js.map