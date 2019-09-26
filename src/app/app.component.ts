import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  location = 'SWOHO';
  purpose = 'meal prep';

  constructor() {}

  ngOnInit() {}
}
