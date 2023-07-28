import { AnnotationType } from "@aspectjs/common";
import { ANNOTATION_FACTORY } from "./annotation-factory";

export const MinLength = ANNOTATION_FACTORY.create(
  AnnotationType.PROPERTY,
  function MinLength(value: number) {}
);
