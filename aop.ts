import { getWeaver } from '@aspectjs/core';
import { ValidatedAspect } from './aspects/validated.aspect';

getWeaver().enable(new ValidatedAspect());
