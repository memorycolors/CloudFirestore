import { Component, OnInit} from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';


@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {



  constructor(private router: Router){
   }
   routingViaAngular(){
     this.router.navigate(['/pagina2']);
   }

  ngOnInit() {
  }

}
