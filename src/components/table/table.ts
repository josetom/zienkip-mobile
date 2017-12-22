import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

import { IManagementReportParams } from '../../model/interfaces/management.interface';

import { UiCreatorTable } from '../ui-creator/ui-creator';

import { UtilitiesProvider, LoggerProvider } from '../../providers/providers';

@Component({
	selector: 'table',
	templateUrl: 'table.html'
})
export class TableComponent implements AfterViewInit, OnChanges, UiCreatorTable {
	exampleDatabase: ExampleHttpDao | null;
	dataSource = new MatTableDataSource();

	isError = false;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	@Input() type: string = "table";
	@Input() data: any[];
	@Input() reportParams: IManagementReportParams[];

	private loadingCancelHook: Function;
	private reportColumns: string[];

	constructor(private http: HttpClient, private utils: UtilitiesProvider, private LOGGER: LoggerProvider) { }

	ngOnChanges(changes: SimpleChanges) {
		// this.LOGGER.debug(changes);
		if (changes.reportParams.currentValue) {
			this.reportColumns = changes.reportParams.currentValue
				.filter((columnDef) => {
					return columnDef.meta && columnDef.meta.v;
				})
				.map((columnDef) => {
					return columnDef.colId;
				});
		}
	}

	ngAfterViewInit() {
		this.exampleDatabase = new ExampleHttpDao(this.http);

		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
			startWith({}),
			switchMap(() => {
				this.loadingCancelHook = this.utils.showLoading('Loading data...');
				return this.exampleDatabase!.getRepoIssues(
					this.sort.active, this.sort.direction, this.paginator.pageIndex);
			}),
			map(data => {
				// Flip flag to show that loading has finished.
				this.isError = false;
				if (this.loadingCancelHook) {
					this.loadingCancelHook.apply(this, []);
				}
				return this.data;
			}),
			catchError(() => {
				// Catch if the GitHub API has reached its rate limit. Return empty data.
				this.isError = true;
				if (this.loadingCancelHook) {
					this.loadingCancelHook.apply(this, []);
				}
				return observableOf([]);
			})
			).subscribe(data => this.dataSource.data = data);
	}

}

export interface GithubApi {
	items: GithubIssue[];
	total_count: number;
}

export interface GithubIssue {
	created_at: string;
	number: string;
	state: string;
	title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
	constructor(private http: HttpClient) { }

	getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
		const href = 'https://api.github.com/search/issues';
		const requestUrl =
			`${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

		return this.http.get<GithubApi>(requestUrl);
	}
}
