import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Customer } from '../interfaces/customer.model';
import { Transaction } from '../interfaces/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private customersUrl = 'assets/customers.json';
  private transactionsUrl = 'assets/transactions.json';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionsUrl);
  }

  getTransactionsByCustomerId(customerId: number): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(this.transactionsUrl)
      .pipe(
        map((transactions) =>
          transactions.filter(
            (transaction) => transaction.customer_id === customerId
          )
        )
      );
  }
}
