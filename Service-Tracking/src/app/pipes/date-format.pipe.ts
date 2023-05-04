import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    if( value.length == 16 ){
      return value.replace('T',  ' ');
    }
    return 'unknown date-time';
  }

}
