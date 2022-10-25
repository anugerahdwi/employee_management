import { Component, OnInit } from '@angular/core';

import { Employees } from '../../interfaces/employees';

import { EmployeeService } from '../../services/employee/employee.service';

@Component({
	selector: 'app-employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
	constructor(private employeeService: EmployeeService) { }

	// Data Employee dan Search
	allEmployee: Employees[] = [];
	searchEmployee = '';

	// Data Pagination
	currentPage: number = 1;
	itemsPerPage: number = 5;
	totalItems: number = 0;
	tableSize: number[] = [5, 10, 15, 20];

	ngOnInit(): void {
		// Get Data Employee
		this.dataEmployee();
	}

	// Get Data Employee
	// mengambil semua data employee dari database
	dataEmployee() {
		this.employeeService.getDataEmployeeDesc().subscribe(res => {
			this.allEmployee = res;
		});
	}

	// Search Data Employee
	// mencari data employee dan menampilkan kedalam tabel
	searchDataEmployee() {
		if (this.searchEmployee !== '') {
			// mencari data employee berdasarkan 'first_name'
			this.employeeService.searchDataEmployee('first_name', this.searchEmployee).subscribe(res => {
				if (res.length == 0) {
					// mencari data employee berdasarkan 'last_name'
					this.employeeService.searchDataEmployee('last_name', this.searchEmployee).subscribe(res => {
						if (res.length == 0) {
							// mencari data employee berdasarkan 'email'
							this.employeeService.searchDataEmployee('email', this.searchEmployee).subscribe(res => {
								if (res.length == 0) {
									// mencari data employee berdasarkan 'username'
									this.employeeService.searchDataEmployee('username', this.searchEmployee).subscribe(res => {
										if (res.length == 0) {
											// mencari data employee berdasarkan 'group'
											this.employeeService.searchDataEmployee('group', this.searchEmployee).subscribe(res => {
												if (res.length == 0) {
													this.allEmployee = [];
												} else {
													this.allEmployee = res;
												}
											});
										} else {
											this.allEmployee = res;
										}
									});
								} else {
									this.allEmployee = res;
								}
							});
						} else {
							this.allEmployee = res;
						}
					});
				} else {
					this.allEmployee = res;
				}
			});
		}
		else { 
			this.employeeService.getDataEmployeeDesc().subscribe(res => {
				this.allEmployee = res;
			});
		}
	}

	// Ukuran Data Per Page
	// set jumlah data yang ditampilkan di tabel per page
	setDataTableSize(event: any): void {
		this.itemsPerPage = event.target.value;
		this.currentPage = 1;
		this.dataEmployee();
	}

	// Pagination Tabel
	// set ukuran pagination tabel
	setDataTablePagination(event: any) {
		this.currentPage = event;
		this.dataEmployee();
	}
}
