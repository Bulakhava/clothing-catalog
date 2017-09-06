"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var data_1 = require("../../services/data");
var InnerComponent = /** @class */ (function () {
    function InnerComponent(route, router) {
        this.route = route;
        this.router = router;
        this.product = {};
    }
    InnerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.productList = data_1.productList;
        for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i].id == this.id) {
                this.product = this.productList[i];
            }
        }
    };
    InnerComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    InnerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'inner',
            templateUrl: 'inner.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_2.Router])
    ], InnerComponent);
    return InnerComponent;
}());
exports.InnerComponent = InnerComponent;
//# sourceMappingURL=inner.component.js.map