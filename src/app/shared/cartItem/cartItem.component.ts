import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_service/api.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cartItem.component.html',
})

export class CartItemComponent {
  @Input() drinkItem: any;
  @Output() addCartEvent = new EventEmitter();

  removeItem(drink: any) {
    this.addCartEvent.emit(drink);  //ripassa il parametro al padre


  }
}
