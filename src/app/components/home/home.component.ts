import { Component, OnInit, DoCheck } from '@angular/core';
import { UsersService } from '../../services/users.service';
import * as d3 from 'd3';
import { scaleSqrt } from 'd3';

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
    const height = 800;

    if (this.users !== undefined) {
      var canvas = d3
        .select('#test')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      var radiusScale = d3
        .scaleSqrt()
        .domain([0, 9])
        .range([10, 50]);

      var simulation = d3
        .forceSimulation()
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05))
        .force(
          'collide',
          d3.forceCollide((d) => radiusScale(d.recipes.length + 0.25))
        );

      var circles = canvas.selectAll('circle').data(this.users);
      circles
        .enter()
        .append('circle')
        .attr('r', (d) => radiusScale(d.recipes.length))
        .style('fill', function() {
          return 'hsl(' + Math.random() * 360 + ',100%,50%)';
        });

      simulation.nodes(this.users).on('tick', () => this.ticked());
    }
  }

  ticked() {
    var canvas = d3.select('#test');
    var circles = canvas.selectAll('circle').data(this.users);
    circles.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
  }
}
