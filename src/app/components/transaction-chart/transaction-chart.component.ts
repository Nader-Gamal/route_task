import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Customer } from 'src/app/interfaces/customer.model';
import { DataService } from 'src/app/services/data.service';

Chart.register(...registerables);

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss'],
})
export class TransactionChartComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  transactions: any[] = [];
  transactionChart: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
        this.filteredCustomers = data; // Initially, show all customers
        this.calculateTotalTransactions();
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  filterCustomers(event: any): void {
    const filterValue = event.target.value;
    if (filterValue) {
      this.filteredCustomers = this.customers.filter(
        (customer) => customer.name === filterValue
      );
    } else {
      this.filteredCustomers = this.customers;
    }

    // Automatically select the first customer in the filtered list
    if (this.filteredCustomers.length > 0) {
      this.selectCustomer(this.filteredCustomers[0]);
    } else {
      this.clearChart();
    }
  }

  filterByTransactions(event: any): void {
    const filterValue = parseInt(event.target.value, 10);
    if (!isNaN(filterValue)) {
      this.filteredCustomers = this.customers.filter(
        (customer) => customer.transactions === filterValue
      );
    } else {
      this.filteredCustomers = this.customers;
    }

    // Automatically select the first customer in the filtered list
    if (this.filteredCustomers.length > 0) {
      this.selectCustomer(this.filteredCustomers[0]);
    } else {
      this.clearChart();
    }
  }

  calculateTotalTransactions(): void {
    this.customers.forEach((customer, index) => {
      this.dataService.getTransactionsByCustomerId(customer.id).subscribe(
        (transactions) => {
          this.customers[index].transactions = transactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
          );
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
    });
  }

  selectCustomer(customer: Customer): void {
    this.dataService.getTransactionsByCustomerId(customer.id).subscribe(
      (data: any[]) => {
        this.transactions = data;
        this.updateChart();
        console.log(data);
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  updateChart(): void {
    const labelData = this.transactions.map((t) => t.date);
    const amountData = this.transactions.map((t) => t.amount);

    if (this.transactionChart) {
      this.transactionChart.destroy();
    }

    this.transactionChart = new Chart('transactionChart', {
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [
          {
            label: 'Transaction Amount',
            data: amountData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  clearChart(): void {
    if (this.transactionChart) {
      this.transactionChart.destroy();
      this.transactionChart = null;
    }
  }
}
