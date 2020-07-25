export type ParseResult<A, B> = [B, A[]];

export abstract class Maybe<A> {
  abstract or(val: Maybe<A>): Maybe<A>;
  abstract bind<B>(f: (x: A) => Maybe<B>): Maybe<B>;
}

export class Ok<A> extends Maybe<A> {
  readonly val: A;
  constructor(val: A) {
    super();
    this.val = val;
  }
  or() {
    return this;
  }
  bind<B>(f: (x: A) => Maybe<B>) {
    return f(this.val);
  }
}

export class Fail<A> extends Maybe<A> {
  readonly val: string;
  constructor(val: string) {
    super();
    this.val = val;
  }
  or(val: Maybe<A>) {
    return val;
  }
  bind<B>(f: (x: A) => Maybe<B>) {
    return (this as unknown) as Fail<B>;
  }
}

export class Error<A> extends Maybe<A> {
  readonly val: string;
  constructor(val: string) {
    super();
    this.val = val;
  }
  or() {
    return this;
  }
  bind<B>(f: (x: A) => Maybe<B>) {
    return (this as unknown) as Error<B>;
  }
}

export function ok<A, B>(res: B, inp: A[]): Maybe<ParseResult<A, B>> {
  return new Ok([res, inp]);
}

export function fail(msg: string): Maybe<unknown> {
  return new Fail(msg);
}

export function error(msg: string): Maybe<unknown> {
  return new Error(msg);
}

export default class Parser<A, B> {
  parse: (inp: A[]) => Maybe<ParseResult<A, B>>;

  constructor(parse: (arr: A[]) => Maybe<ParseResult<A, B>>) {
    this.parse = parse;
  }

  or(p: Parser<A, B>): Parser<A, B> {
    return new Parser((arr) => this.parse(arr).or(p.parse(arr)));
  }

  then<C>(p: Parser<A, C>): Parser<A, [B, C]> {
    return new Parser((arr) =>
      this.parse(arr).bind(([val1, inp1]) => p.parse(inp1).bind(([val2, inp2]) => ok([val1, val2], inp2))),
    );
  }

  using<C>(f: (x: B) => C): Parser<A, C> {
    return new Parser((arr) => this.parse(arr).bind(([val, inp]) => ok(f(val), inp)));
  }
}

export function succeed<A, B>(val: B): Parser<A, B> {
  return new Parser((inp) => ok(val, inp));
}

export function satisfy<A>(f: (arg: A) => boolean): Parser<A, A> {
  return new Parser(([x, ...xs]) => (x && f(x) ? ok(x, xs) : (fail('') as Fail<[A, A[]]>)));
}

export function literal<A>(y: A): Parser<A, A> {
  return satisfy((x) => x === y);
}

export function many<A, B>(p: Parser<A, B>): Parser<A, B[]> {
  return new Parser((arr) =>
    p
      .then(many(p))
      .using(([a, b]) => [a, ...b])
      .or(succeed([]))
      .parse(arr),
  );
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
