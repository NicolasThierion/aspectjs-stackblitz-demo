import { Email } from "./annotations/email.annotation";
import { MinLength } from "./annotations/min-length.annotation";
import { NotBlank } from "./annotations/not-blank.annotation";

export class Comment {
  @Email()
  @MinLength(3)
  username: string;
  @NotBlank()
  value: string;

  constructor(comment: any) {
    this.username = comment.username;
    this.value = comment.value;
  }
}
