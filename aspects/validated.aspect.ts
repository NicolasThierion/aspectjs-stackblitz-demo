import {
  AnnotationType,
  BoundAnnotationContext,
  getAnnotations,
} from "@aspectjs/common";
import {
  Aspect,
  Before,
  BeforeContext,
  JoinpointType,
  on,
} from "@aspectjs/core";
import { MinLength } from "../annotations/min-length.annotation";
import { NotBlank } from "../annotations/not-blank.annotation";
import { Validated } from "../annotations/validated.annotation";

@Aspect()
export class ValidatedAspect {
  @Before(on.parameters.withAnnotations(Validated))
  validate(ctxt: BeforeContext<JoinpointType.PARAMETER>, args: unknown[]) {
    // find all @Validated() annotation on parameters
    const validatedAnnotations = ctxt.annotations.filter(Validated).find();

    // get each parameter annotated with @Validated
    const validatedParameters = validatedAnnotations
      .map((annotation) => annotation.target.value as object)
      .filter((value) => typeof value === "object");

    // for each @Validated() parameters
    validatedParameters.forEach((value) => {
      // find all @MinLength annotations
      getAnnotations(MinLength)
        .onProperty(value)
        .find()
        // validate all attributes annotated with @MinLength()
        .forEach(this.validateMinLength);

      // find all @NotBlank annotations
      getAnnotations(NotBlank)
        .onProperty(value)
        .find()
        // validate all attributes annotated with @NotBlank()
        .forEach(this.validateNotBlank);
    });

    validatedAnnotations.forEach((a) => {
      console.log(`${a} is valid`);
    });
  }
  validateMinLength(
    annotation: BoundAnnotationContext<
      AnnotationType.PROPERTY,
      typeof MinLength
    >
  ) {
    const value = annotation.target.value as number;
    if (value < annotation.args[0]) {
      throw new Error(
        `${annotation.ref} failed on ${annotation.target.label} (value: ${value})`
      );
    }
  }

  validateNotBlank(
    annotation: BoundAnnotationContext<AnnotationType.PROPERTY, typeof NotBlank>
  ) {
    const value = annotation.target.value as string;
    if (value === "" || value === undefined || value === null) {
      throw new Error(
        `${annotation.ref} failed on ${annotation.target.label} (value: ${value})`
      );
    }
  }
}
