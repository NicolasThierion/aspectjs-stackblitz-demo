import { ANNOTATION_FACTORY } from './annotation-factory';
import { AnnotationType } from '@aspectjs/common';

export const MinLength = ANNOTATION_FACTORY.create(
  AnnotationType.PROPERTY,
  function MinLength() {}
);
