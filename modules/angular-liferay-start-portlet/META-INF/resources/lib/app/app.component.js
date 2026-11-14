"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Hero = /** @class */ (function () {
    function Hero() {
        this.id = 0;
        this.name = "";
    }
    return Hero;
}());
exports.Hero = Hero;
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.hero = {
            id: 1,
            name: 'Windstorm'
        };
        this.title = 'Tour of Heroes';
    }
    AppComponent = __decorate([
        core_1.Component({
            template: "\n\t<h1>{{title}}</h1>\n\t<h2>{{hero.name}} details!</h2>\n\t<div><label>id: </label>{{hero.id}}</div>\n\t<div>\n\t\t<label>name: </label>\n\t\t<input [(ngModel)]=\"hero.name\" placeholder=\"name\">\n\t</div>\n\t",
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map