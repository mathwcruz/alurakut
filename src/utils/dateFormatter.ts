import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function dateFormatter(date: string, formatter: string) {
  const dateFormatted = format(parseISO(date), formatter, {
    locale: ptBR,
  });

  return dateFormatted;
}
