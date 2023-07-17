import { Aspect, Before, BeforeContext, on } from '@aspectjs/core';
import { Validated } from '../annotations/validated.annotation';

@Aspect()
export class ValidatedAspect {
  @Before(on.parameters.withAnnotations(Validated))
  validate(ctxt: BeforeContext, value: any) {
    console.log(`validated : ${value}`);
  }
}
