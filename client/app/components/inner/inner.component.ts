import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {Product} from '../../models/models';
import {productList} from '../../services/data';

@Component({
	moduleId:module.id,
	selector: 'inner', 
	templateUrl: 'inner.component.html'
	
})

export class InnerComponent implements OnInit, OnDestroy{

	id:string;
	private sub: any;
	productList:Product[];
	product = {};

	constructor(private route: ActivatedRoute, private router:Router) {}

	ngOnInit(){

		this.sub = this.route.params.subscribe(params => {
			this.id = params['id'];
		});

        this.productList = productList;

        for(var i=0; i<this.productList.length; i++){
        	if(this.productList[i].id == this.id){
        		this.product = this.productList[i];
        	}
        }

	}

	ngOnDestroy(){

		this.sub.unsubscribe();

	}

}