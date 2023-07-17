import { ANNOTATION_FACTORY } from './annotation-factory';
import { AnnotationType } from '@aspectjs/common';

export const NotBlank = ANNOTATION_FACTORY.create(
  AnnotationType.PROPERTY,
  function NotBlank() {}
);
