export abstract class ParseResult<A> {
  abstract bind<B>(f: (x: A) => ParseResult<B>): ParseResult<B>;
  abstract alt<B>(val: ParseResult<B>): ParseResult<B>;
}

export class Ok<A> extends ParseResult<A> {
  val: A;
  constructor(val: A) {
    super();
    this.val = val;
  }
  bind<B>(f: (x: A) => ParseResult<B>) {
    return f(this.val);
  }
  alt<B>(val: ParseResult<B>) {
    return val;
  }
}

export class Fail<A> extends ParseResult<A> {
  val: string;
  constructor(val: string) {
    super();
    this.val = val;
  }
  bind<B>(f: (x: A) => ParseResult<B>) {
    return (this as unknown) as Fail<B>;
  }
  alt<B>(val: ParseResult<B>) {
    return val;
  }
}

export class Error<A> extends ParseResult<A> {
  val: string;
  constructor(val: string) {
    super();
    this.val = val;
  }
  bind<B>(f: (x: A) => ParseResult<B>) {
    return (this as unknown) as Error<B>;
  }
  alt<B>(val: ParseResult<B>) {
    return (this as unknown) as Error<B>;
  }
}
