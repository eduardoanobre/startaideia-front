import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export default class ErroUtils {
  static parse(error: any): any {
    // HttpErrorResponse
    if (error instanceof HttpErrorResponse) {
      const errorEvent = new HttpResponse({
        body: {
          message: error.error.message,
          status: error.status,
          statusText: error.statusText,
        },
      });

      if (errorEvent.body.message) {
        console.log('errorEvent.body.message: ' + errorEvent.body.message);
        return errorEvent.body.message;
      }

      if (errorEvent.body.statusText === 'Unknown Error') {
        return 'Erro desconhecido';
      }

      console.log('errorEvent.body.statusText: ' + errorEvent.body.statusText);
      return errorEvent.body.statusText;
    }

    // TypeError
    if (error instanceof TypeError) {
      console.log('TypeError error: ' + error);

      if (error && error.message) {
        const errorEvent = new HttpResponse({
          body: {
            message: error.message,
          },
        });
        return error.message;
      }

      console.log('TypeError error: ' + error);
      return 'Não foi possível obter dados: [HttpErrorResponse]';
    }

    console.log(error);
    return error;
  }
}
