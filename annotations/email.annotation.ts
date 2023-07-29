import { AnnotationType } from "@aspectjs/common";
import { ANNOTATION_FACTORY } from "./annotation-factory";

export const Email = ANNOTATION_FACTORY.create(
  AnnotationType.PROPERTY,
  function Email() {}
);
