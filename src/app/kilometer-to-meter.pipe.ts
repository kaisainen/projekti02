import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kilometerToMeter',
})
export class KilometerToMeterPipe implements PipeTransform {
  transform(kilometer: number): string {
    if (kilometer < 1) {
      let km2m = 1000;
      let meters = kilometer * km2m;
      return meters.toFixed(0) + ' m';
    } else {
      return kilometer.toFixed(2) + ' km';
    }
  }
}
