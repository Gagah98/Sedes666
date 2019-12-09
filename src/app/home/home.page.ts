import { Component, OnInit } from '@angular/core';

export interface HomePageTab {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tabs: HomePageTab[];

  constructor() { 
    this.tabs = [
      { title: 'Bench', icon: 'add', path: 'bench' },
    ]
  }

  ngOnInit() {
  }

}
