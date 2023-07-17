import { ANNOTATION_FACTORY } from './annotation-factory';
import { AnnotationType } from '@aspectjs/common';

export const Validated = ANNOTATION_FACTORY.create(
  AnnotationType.PARAMETER,
  function Validated() {}
);
