import { Transform } from 'class-transformer';
import { parseISO, isValid, startOfDay } from 'date-fns';

export function ToDate() {
  return Transform(({ value }) => {
    if (!value || typeof value !== 'string') return value;

    const date = parseISO(value);

    if (isValid(date)) {
      return startOfDay(date);
    }

    return value;
  });
}