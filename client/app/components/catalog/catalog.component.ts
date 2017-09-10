import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/models';
import {productList} from '../../services/data';

@Component({
	moduleId:module.id,
        selector: 'catalog', 
        templateUrl: 'catalog.component.html'

})

export class CatalogComponent implements OnInit{

	productList:Product[];
	productAll:any={};
	products:any = [];
        button:boolean = false;
        sorted:boolean = false;
        sortedStatus:string = 'up';
        smallWidth:number = 740;
        middleWidth:number = 940;
        windowWidth:number;
        numberOfVisible:number;
        slide:any = false;

        renderPage(){
                this.windowWidth = window.innerWidth;
                if(this.windowWidth >= this.middleWidth){
                        this.numberOfVisible = 3;
                }if(this.windowWidth < this.middleWidth && this.windowWidth >= this.smallWidth){
                        this.numberOfVisible = 2;   
                }if(this.windowWidth < this.smallWidth){
                        this.numberOfVisible = 1;    
                }

                for(var i=0; i<this.products.length; i++){
                        this.products[i][0].qtyViewedSlides = 1;
                        this.products[i][0].qtyAllSlides = Math.ceil(this.products[i][1].products.length/this.numberOfVisible); 
                        this.products[i][0].firstLimit = 0;
                        this.products[i][0].lastLimit =this.products[i][0].firstLimit + this.numberOfVisible;    
                }
        }

        onResize(){
                this.renderPage();
                this.setDefault();
        }

        showButton(){
                this.button = this.products.some(function(el){
                        return !el[0].visibility;
                });
        }

        
        seeAllProducts(){
                this.products.forEach(function(el){
                        el[0].visibility = true;
                }); 
                this.button = false;
        } 


        setDefault(){
                
                for(var i=0; i<this.products.length; i++){
                        this.products[i][0].firstLimit = 0;
                        this.products[i][0].lastLimit =this.products[i][0].firstLimit + this.numberOfVisible;
                        this.products[i][0].qtyViewedSlides = 1;
                } 
        }

        sortByPrice(){

                if(!this.sorted){
                        for(var key in this.productAll){
                                this.productAll[key].sort(function(a,b){
                                        return a.price - b.price;
                                });
                        }
                        this.sorted = true;
                        this.sortedStatus = 'down';
                        
                }else{
                        for(var key in this.productAll){
                                this.productAll[key].reverse();
                                this.sortedStatus == 'down' ? this.sortedStatus = 'up' : this.sortedStatus = 'down';
                        }  

                }

                if(this.slide){
                        this.setDefault();
                        this.slide = false;    
                }

        }     


        nextSlide(section){

                if(section[0].qtyViewedSlides < section[0].qtyAllSlides){
                        section[0].qtyViewedSlides++; 
                        section[0].firstLimit += this.numberOfVisible;
                        section[0].lastLimit += this.numberOfVisible;
                        this.slide = true;  
                }

        }

        prevSlide(section){
                if(section[0].qtyViewedSlides > 1){
                        section[0].lastLimit -= this.numberOfVisible;
                        section[0].firstLimit = section[0].lastLimit - this.numberOfVisible;
                        section[0].qtyViewedSlides--;
                        this.slide = true;    
                }
        }


        getStylesNext(section){
                let myStyles = {
                        'cursor': section [0].qtyViewedSlides == section[0].qtyAllSlides ? 'inherit' : 'pointer'
                }
                return myStyles;
        }

        getStylesPrev(section){
                let myStyles = {
                        'cursor': section [0].qtyViewedSlides == 1 ? 'inherit' : 'pointer'
                }
                return myStyles;  
        }


        ngOnInit(){

                this.productList = productList;

                for(var i=0; i<this.productList.length; i++){
                        this.productList[i].section = this.productList[i].section.toLowerCase().trim();
                        if(!this.productAll[this.productList[i].section]){
                                this.productAll[this.productList[i].section] = [this.productList[i]];
                        }else{
                                this.productAll[this.productList[i].section].push(this.productList[i]);
                        }
                }



                for (var key in this.productAll){
                        this.productAll[key].forEach(function(el){
                                el.params.showSize = false;

                        });
                        this.products.push([{section:key, visibility:true},{products:this.productAll[key]}]);
                }

                
                console.log(this.products);
                this.renderPage();	
        }

}