import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service'; // Adjust the path to your service
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public salesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Sales' },
      { data: [], label: 'Revenue' },
    ],
  };

  public salesChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public salesChartLegend = true;

  public ordersChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Orders' }],
  };

  public ordersChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public ordersChartLegend = true;

  public productsChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Products' }],
  };

  public productsChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public productsChartLegend = true;

  public customersChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Customers' }],
  };

  public customersChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
  };
  public customersChartLegend = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOrdersData();
    this.loadProductsData();
    this.loadCustomersData();
  }

  private loadOrdersData(): void {
    this.apiService.getOrdersData().subscribe({
      next: (data) => {
        console.log('Fetched Orders Data:', data);

        // Update Sales and Orders Charts
        this.salesChartData = {
          labels: data.labels,
          datasets: [
            { data: data.revenueValues, label: 'Revenue' },
            { data: data.salesValues, label: 'Sales' },
          ],
        };

        this.ordersChartData = {
          labels: data.labels,
          datasets: [{ data: data.salesValues, label: 'Orders' }],
        };
      },
      error: (err) => console.error('Error fetching orders data:', err),
    });
  }

  private loadProductsData(): void {
    this.apiService.getProductsData().subscribe({
      next: (data) => {
        console.log('Fetched Products Data:', data);

        // Update Products Chart
        this.productsChartData = {
          labels: data.labels,
          datasets: [{ data: data.values, label: 'Products' }],
        };
      },
      error: (err) => console.error('Error fetching products data:', err),
    });
  }

  private loadCustomersData(): void {
    this.apiService.getCustomersData().subscribe({
      next: (data) => {
        console.log('Fetched Customers Data:', data);

        // Update Customers Chart
        this.customersChartData = {
          labels: data.labels,
          datasets: [{ data: data.values, label: 'Customers' }],
        };
      },
      error: (err) => console.error('Error fetching customers data:', err),
    });
  }
}
