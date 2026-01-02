import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class NavBarComponent {
  constructor(private router: Router) {}

  navigate(tab: string) {
    this.router.navigate([`/${tab}`]);
  }
}
