import chalk from 'chalk';

export function log(message: string) {
  console.log('[', chalk.keyword('yellow')('server'), ']', message);
}
