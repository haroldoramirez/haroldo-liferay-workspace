"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_component_1 = require("./app/app.component");
var app_module_1 = require("./app/app.module");
var dynamic_loader_1 = require("./app/dynamic.loader");
function default_1(rootId) {
    platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(app_module_1.AppModule)
        .then(function (injector) {
        // Load the bootstrap component dinamically so that we can attach it
        // to the portlet's DOM, which is different for each portlet
        // instance and, thus, cannot be determined until the page is
        // rendered (during runtime).
        // The rootId argument is passed from view.jsp where we can obtain
        // the portlet's namespace by using JSP tags.
        var dynamicLoader = new dynamic_loader_1.DynamicLoader(injector);
        dynamicLoader.loadComponent(app_component_1.AppComponent, rootId);
    });
}
exports.default = default_1;
//# sourceMappingURL=main.js.map