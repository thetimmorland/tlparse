import Parser, { ok, fail, error, succeed, satisfy, literal, many, some } from '../index';

test('succeed', () => {
  const p = succeed('a');
  expect(p.parse('foo'.split(''))).toStrictEqual(ok('a', ['f', 'o', 'o']));
});

test('literal', () => {
  const p = literal('a');
  expect(p.parse(['a', 'b'])).toStrictEqual(ok('a', ['b']));
});

test('or', () => {
  const p = literal('a').or(literal('b'));
  expect(p.parse(['a', 'b'])).toStrictEqual(ok('a', ['b']));
  expect(p.parse(['b', 'c'])).toStrictEqual(ok('b', ['c']));
});

test('then', () => {
  const p = satisfy((x) => x === 'a').then(satisfy((x) => x === 'b'));
  expect(p.parse('abc'.split(''))).toStrictEqual(ok(['a', 'b'], ['c']));
});

test('many', () => {
  const p = many(literal('a'));
  expect(p.parse(['a', 'a', 'c'])).toStrictEqual(ok(['a', 'a'], ['c']));
});

test('some', () => {
  const p = some(literal('a'));
  expect(p.parse('aab'.split(''))).toStrictEqual(ok(['a', 'a'], ['b']));
  expect(p.parse('bba'.split(''))).toStrictEqual(fail(''));
});
