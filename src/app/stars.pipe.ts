import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars'
})
export class StarsPipe implements PipeTransform {

  transform(value: number): string {
    let starsTpl:string = '';
    for(let i=1; i<=value;i++) {
      starsTpl+='<i class="fa-solid fa-star"></i>';
    }
    return starsTpl;
  }

}