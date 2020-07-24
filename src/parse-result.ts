export abstract class ParseResult<A> {
  abstract alt(val: ParseResult<A>): ParseResult<A>;
  abstract bind<B>(f: (x: A) => ParseResult<B>): ParseResult<B>;
}

export class Ok<A> extends ParseResult<A> {
  readonly val: A;
  constructor(val: A) {
    super();
    this.val = val;
  }
  alt() {
    return this;
  }
  bind<B>(f: (x: A) => ParseResult<B>) {
    return f(this.val);
  }
}

export class Fail<A> extends ParseResult<A> {
  readonly val: string;
  constructor(val: string) {
    super();
    this.val = val;
  }
  alt(val: ParseResult<A>) {
    return val;
  }
  bind<B>(f: (x: A) => ParseResult<B>) {
    return (this as unknown) as Fail<B>;
  }
}

export class Error<A> extends ParseResult<A> {
  readonly val: string;
  constructor(val: string) {
    super();
    this.val = val;
  }
  alt() {
    return this;
  }
  bind<B>(f: (x: A) => ParseResult<B>) {
    return (this as unknown) as Error<B>;
  }
}
