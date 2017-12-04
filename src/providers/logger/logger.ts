import { Injectable } from '@angular/core';

// Define the interface that all loggers must implement.
export interface ILogger {
	assert(...args: any[]): any;
	error(...args: any[]): any;
	info(...args: any[]): any;
	log(...args: any[]): any;
	warn(...args: any[]): any;
	debug(...args: any[]): any;
}


@Injectable()
// Set up the default logger. The default logger doesn't actually log anything; but, it
// provides the Dependency-Injection (DI) token that the rest of the application can use
// for dependency resolution. Each platform can then override this with a platform-
// specific logger implementation, like the ConsoleLogService (below).
export class LoggerProvider implements ILogger {


	public assert: any = console.assert.bind(console);


	public error: any = console.error.bind(console);


	public info: any = console.info.bind(console);


	public log: any = console.log.bind(console);


	public warn: any = console.warn.bind(console);


	public debug: any = console.debug.bind(console);

}
