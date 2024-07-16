import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer.model';
import { Transaction } from '../interfaces/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }

  getTransactionsByCustomerId(customerId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.apiUrl}/transactions?customer_id=${customerId}`
    );
  }
}
