import { Component } from '@angular/core'
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Calvalry-Regiment-Website'
  constructor() {
    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1)
    }
  }
}
