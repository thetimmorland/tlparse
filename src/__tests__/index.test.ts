// import Parser, { many } from '../index';

// test('succeed', () => {
//   const p = succeed('a');
//   expect(p.parse('foo'.split(''))).toStrictEqual(ok({ result: 'a', input: ['f', 'o', 'o'] }));
// });

// test('or', () => {
//   const p = literal('a').or(literal('b'));
//   expect(p.parse('ab'.split(''))).toStrictEqual(ok({ result: 'a', input: ['b'] }));
//   expect(p.parse('bc'.split(''))).toStrictEqual(ok({ result: 'b', input: ['c'] }));
// });

// test('then', () => {
//   const p = satisfy((x) => x === 'a').then(satisfy((x) => x === 'b'));
//   expect(p.parse('abc'.split(''))).toStrictEqual(ok({ result: ['a', 'b'], input: ['c'] }));
// });

// test('many', () => {
//   const p = many(literal('a'));
//   expect(p.parse(['a', 'a', 'c'])).toStrictEqual(ok({ result: ['a', 'a'], input: ['c'] }));
// });

// test('some', () => {
//   const p = some(literal('a'));
//   expect(p.parse('aab'.split(''))).toStrictEqual(ok({ result: ['a', 'a'], input: ['b'] }));
//   expect(p.parse('bba'.split(''))).toStrictEqual(fail(''));
// });

// test('prelex', () => {
//   expect(prelex(['\t', 'a', '\n', 'b'])).toStrictEqual([
//     { ch: '\t', pos: { row: 0, col: 0 } },
//     { ch: 'a', pos: { row: 0, col: 8 } },
//     { ch: '\n', pos: { row: 0, col: 9 } },
//     { ch: 'b', pos: { row: 1, col: 0 } },
//   ]);
// });

// test('alpha', () => {
//   expect(alpha('a')).toStrictEqual(succeed('a', []));
// });

// test('ident', () => {
//   expect(ident([{ ch: 'a', pos: { row: 0, col: 8 } }])).toStrictEqual(
//     succeed(
//       {
//         tag: 'ident',
//         val: 'a',
//         pos: { row: 0, col: 8 },
//       },
//       [],
//     ),
//   );
// });

// test('lex', () => {
//   expect(lex('foo = x -> x + 1'.split(''))).toStrictEqual(
//     succeed(
//       [
//         {
//           tag: 'ident',
//           val: 'foo',
//           pos: { row: 0, col: 0 },
//         },
//         {
//           tag: 'eq',
//           val: '=',
//           pos: { row: 0, col: 4 },
//         },
//         {
//           tag: 'ident',
//           val: 'x',
//           pos: { row: 0, col: 6 },
//         },
//         {
//           tag: 'to',
//           val: '->',
//           pos: { row: 0, col: 6 },
//         },
//         {
//           tag: 'ident',
//           val: 'x',
//           pos: { row: 0, col: 6 },
//         },
//         {
//           tag: 'plus',
//           val: '+',
//           pos: { row: 0, col: 6 },
//         },
//         {
//           tag: 'number',
//           val: 1,
//           pos: { row: 0, col: 4 },
//         },
//       ],
//       [],
//     ),
//   );
// });
