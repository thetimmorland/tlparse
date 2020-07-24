import { ParseResult, Ok, Fail, Error } from './parse-result';

export function ok<A>(val: A) {
  return new Ok(val);
}

export function fail(msg: string) {
  return new Fail(msg);
}

export function error(msg: string) {
  return new Error(msg);
}

export class Parser<A, B> {
  parse: (inp: A[]) => ParseResult<[B, A[]]>;

  constructor(parse: (arr: A[]) => ParseResult<[B, A[]]>) {
    this.parse = parse;
  }

  or(p: Parser<A, B>): Parser<A, B> {
    return new Parser((arr) => this.parse(arr).alt(p.parse(arr)));
  }

  then<C>(p: Parser<A, C>): Parser<A, [B, C]> {
    return new Parser((arr) =>
      this.parse(arr).bind(([val1, inp1]) => p.parse(inp1).bind(([val2, inp2]) => ok([[val1, val2], inp2]))),
    );
  }

  using<C>(f: (x: B) => C): Parser<A, C> {
    return new Parser((arr) => this.parse(arr).bind(([val, inp]) => ok([f(val), inp])));
  }
}

export function succeed<A, B>(val: B): Parser<A, B> {
  return new Parser((inp) => ok([val, inp]));
}

export function satisfy<A>(f: (arg: A) => boolean): Parser<A, A> {
  return new Parser(([x, ...xs]) => (x && f(x) ? ok([x, xs]) : (fail('') as Fail<[A, A[]]>)));
}

export function literal<A>(y: A): Parser<A, A> {
  return satisfy((x) => x === y);
}

export function many<A, B>(p: Parser<A, B>): Parser<A, B[]> {
  return p
    .then(many(p))
    .using(([a, b]) => [a, ...b])
    .or(succeed([]));
}

export function some<A, B>(p: Parser<A, B>): Parser<A, B[]> {
  return p.then(many(p)).using(([a, b]) => [a, ...b]);
}

export function nofail<A, B>(p: Parser<A, B>): Parser<A, B> {
  return new Parser((arr) => {
    const out = p.parse(arr);
    if (out instanceof Fail) {
      return error(out.val) as Error<[B, A[]]>;
    } else {
      return out;
    }
  });
}
