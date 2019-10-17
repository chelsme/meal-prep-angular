import { Component, OnInit, DoCheck } from '@angular/core';
import { UsersService } from '../../services/users.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {
  users: any[];
  imgUrl;

  constructor(private userService: UsersService) {}

  ngOnInit() {}

  ngDoCheck() {
    if (this.users === undefined) {
      this.userService.fetchUsers();
      this.users = this.userService.users;
      this.createChart();
    }

    if (this.users && this.users.length !== this.userService.users.length) {
      this.users = this.userService.users;
    }
  }

  createChart() {
    const width = 1200;
    const height = 600;

    if (this.users !== undefined) {
      var canvas = d3
        .select('#test')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      var circles = canvas.selectAll('circle').data(this.users);
      circles
        .enter()
        .append('circle')
        .attr('cx', (d) => (d.id + 5) * 50)
        .attr('cy', (d) => (d.recipes.length + 2) * 5)
        .attr('r', (d) => (d.recipes.length + 2) * 5)
        .style('fill', function() {
          return 'hsl(' + Math.random() * 360 + ',100%,50%)';
        });
    }
  }
}
