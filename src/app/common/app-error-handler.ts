import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {

    handleError(error: any): void {
         alert('Ha ocurrido un error inesperado');
                  console.log(error);
    }
}