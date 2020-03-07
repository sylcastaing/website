import { TaskEither, taskEither } from 'fp-ts/lib/TaskEither';
import { array } from 'fp-ts/lib/Array';

const sequenceTaskEitherArray = array.sequence(taskEither);

/**
 * Parallel Task Either
 *
 * Can start parallel TE with types Right array
 *
 * (1 to 4) TE in parallel
 */
export function parallelTE<L, A>(a: TaskEither<L, A>): TaskEither<L, [A]>;
// this is the standard Monoidal mult https://github.com/gcanti/fp-ts/blob/78917aada5d30f177090141202a3dff7fcd0c77b/src/Monoidal.ts#L15
export function parallelTE<L, A, B>(a: TaskEither<L, A>, b: TaskEither<L, B>): TaskEither<L, [A, B]>;
export function parallelTE<L, A, B, C>(
  a: TaskEither<L, A>,
  b: TaskEither<L, B>,
  c: TaskEither<L, C>,
): TaskEither<L, [A, B, C]>;
export function parallelTE<L, A, B, C, D>(
  a: TaskEither<L, A>,
  b: TaskEither<L, B>,
  c: TaskEither<L, C>,
  d: TaskEither<L, D>,
): TaskEither<L, [A, B, C, D]>;

export function parallelTE<L, A>(...list: TaskEither<L, A>[]): TaskEither<L, A[]> {
  return sequenceTaskEitherArray(list);
}
