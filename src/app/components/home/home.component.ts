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
      // this.test();
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
        .scaleLinear()
        .domain([0, 10])
        .range([10, 125]);

      var imgScale = d3
        .scaleLinear()
        .domain([0, 10])
        .range([20, 220]);

      var circleSimulation = d3
        .forceSimulation()
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05))
        .force(
          'collide',
          d3.forceCollide((d) => radiusScale(d.recipes.length - 7))
        );

      var imgSimulation = d3
        .forceSimulation()
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05))
        .force(
          'collide',
          d3.forceCollide((d) => imgScale(d.recipes.length + 0.25))
        );

      var circles = canvas.selectAll('circle').data(this.users);
      circles
        .enter()
        .append('circle')
        .attr('r', (d) => radiusScale(d.recipes.length))
        .style('fill', function() {
          return 'hsl(' + Math.random() * 360 + ',100%,50%)';
        });

      circleSimulation
        .nodes(this.users)
        .on('tick', () => this.ticked(radiusScale));
      imgSimulation
        .nodes(this.users)
        .on('tick', () => this.ticked(radiusScale));

      var images = canvas.selectAll('image').data(this.users);
      images
        .enter()
        .append('image')
        .attr('xlink:href', (d) => `./assets/profile-pics/${d.name}.png`)
        .attr('alt', (d) => d.name)
        .attr('height', (d) => imgScale(d.recipes.length))
        .attr('width', (d) => imgScale(d.recipes.length));
    }
  }

  ticked(radiusScale) {
    var canvas = d3.select('#test');
    var circles = canvas.selectAll('circle').data(this.users);
    circles
      .attr('cx', (d) => d.x + radiusScale(d.recipes.length / 2))
      .attr('cy', (d) => d.y + radiusScale(d.recipes.length / 2));

    var canvas = d3.select('#test');
    var images = canvas.selectAll('image').data(this.users);
    images.attr('x', (d) => d.x).attr('y', (d) => d.y);
  }
}
