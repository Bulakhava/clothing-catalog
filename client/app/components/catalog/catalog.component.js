"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_1 = require("../../services/data");
var CatalogComponent = /** @class */ (function () {
    function CatalogComponent() {
        this.productAll = {};
        this.products = [];
        this.button = false;
        this.sorted = false;
        this.sortedStatus = 'up';
        this.smallWidth = 740;
        this.middleWidth = 940;
        this.slide = false;
    }
    CatalogComponent.prototype.renderPage = function () {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth >= this.middleWidth) {
            this.numberOfVisible = 3;
        }
        if (this.windowWidth < this.middleWidth && this.windowWidth >= this.smallWidth) {
            this.numberOfVisible = 2;
        }
        if (this.windowWidth < this.smallWidth) {
            this.numberOfVisible = 1;
        }
        for (var i = 0; i < this.products.length; i++) {
            this.products[i][0].qtyViewedSlides = 1;
            this.products[i][0].qtyAllSlides = Math.ceil(this.products[i][1].products.length / this.numberOfVisible);
            this.products[i][0].firstLimit = 0;
            this.products[i][0].lastLimit = this.products[i][0].firstLimit + this.numberOfVisible;
        }
    };
    CatalogComponent.prototype.onResize = function () {
        this.renderPage();
        this.setDefault();
    };
    CatalogComponent.prototype.showButton = function () {
        this.button = this.products.some(function (el) {
            return !el[0].visibility;
        });
    };
    CatalogComponent.prototype.seeAllProducts = function () {
        this.products.forEach(function (el) {
            el[0].visibility = true;
        });
        this.button = false;
    };
    CatalogComponent.prototype.setDefault = function () {
        for (var i = 0; i < this.products.length; i++) {
            this.products[i][0].firstLimit = 0;
            this.products[i][0].lastLimit = this.products[i][0].firstLimit + this.numberOfVisible;
            this.products[i][0].qtyViewedSlides = 1;
        }
    };
    CatalogComponent.prototype.sortByPrice = function () {
        if (!this.sorted) {
            for (var key in this.productAll) {
                this.productAll[key].sort(function (a, b) {
                    return a.price - b.price;
                });
            }
            this.sorted = true;
            this.sortedStatus = 'down';
        }
        else {
            for (var key in this.productAll) {
                this.productAll[key].reverse();
                this.sortedStatus == 'down' ? this.sortedStatus = 'up' : this.sortedStatus = 'down';
            }
        }
        if (this.slide) {
            this.setDefault();
            this.slide = false;
        }
    };
    CatalogComponent.prototype.nextSlide = function (section) {
        if (section[0].qtyViewedSlides < section[0].qtyAllSlides) {
            section[0].qtyViewedSlides++;
            section[0].firstLimit += this.numberOfVisible;
            section[0].lastLimit += this.numberOfVisible;
            this.slide = true;
        }
    };
    CatalogComponent.prototype.prevSlide = function (section) {
        if (section[0].qtyViewedSlides > 1) {
            section[0].lastLimit -= this.numberOfVisible;
            section[0].firstLimit = section[0].lastLimit - this.numberOfVisible;
            section[0].qtyViewedSlides--;
            this.slide = true;
        }
    };
    CatalogComponent.prototype.getStylesNext = function (section) {
        var myStyles = {
            'cursor': section[0].qtyViewedSlides == section[0].qtyAllSlides ? 'inherit' : 'pointer'
        };
        return myStyles;
    };
    CatalogComponent.prototype.getStylesPrev = function (section) {
        var myStyles = {
            'cursor': section[0].qtyViewedSlides == 1 ? 'inherit' : 'pointer'
        };
        return myStyles;
    };
    CatalogComponent.prototype.ngOnInit = function () {
        this.productList = data_1.productList;
        for (var i = 0; i < this.productList.length; i++) {
            this.productList[i].section = this.productList[i].section.toLowerCase().trim();
            if (!this.productAll[this.productList[i].section]) {
                this.productAll[this.productList[i].section] = [this.productList[i]];
            }
            else {
                this.productAll[this.productList[i].section].push(this.productList[i]);
            }
        }
        for (var key in this.productAll) {
            this.productAll[key].forEach(function (el) {
                el.params.showSize = false;
            });
            this.products.push([{ section: key, visibility: true }, { products: this.productAll[key] }]);
        }
        console.log(this.products);
        this.renderPage();
    };
    CatalogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'catalog',
            templateUrl: 'catalog.component.html'
        })
    ], CatalogComponent);
    return CatalogComponent;
}());
exports.CatalogComponent = CatalogComponent;
//# sourceMappingURL=catalog.component.js.map