import { Around, Aspect, BeforeContext, JoinPoint, on } from "@aspectjs/core";
import Toastify from "toastify-js";
import { Toasted } from "../annotations/toasted.annotation";

@Aspect()
export class ToastedAspect {
  toastedConsole = new ToastingConsole();
  originalConsole = console;
  @Around(
    // on.classes.withAnnotations(Toasted),
    on.methods.withAnnotations(Toasted)
  )
  toastLogs(ctxt: BeforeContext, jp: JoinPoint, jpArgs: unknown[]) {
    this.monkeyPatchConsole();
    try {
      return jp(...jpArgs);
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      this.restoreConsole();
    }
  }

  /**
   * Replaces console logs by toasts
   */
  monkeyPatchConsole() {
    console = this.toastedConsole as any;
  }

  /**
   * restore console state
   */
  restoreConsole() {
    console = this.originalConsole;
  }
}

class ToastingConsole {
  private showToast(
    className: string,
    color1: string,
    color2: string,
    args: unknown[]
  ) {
    Toastify({
      text: args.join(", "),
      className,
      style: {
        background: `linear-gradient(to right, ${color1}, ${color2})`,
      },
    }).showToast();
  }
  log(...args: any) {
    this.showToast("log", "#0057b0", "#3d8dc9", args);
  }

  info(...args: any) {
    this.showToast("log", "#00b09b", "#96c93d", args);
  }

  error(...args: any) {
    this.showToast("error", "#b04a00", "#c9a93d", args);
  }
}
