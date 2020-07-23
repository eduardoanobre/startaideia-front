import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "tagsFormat",
})
export class TagsFormatPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string[], ...args: unknown[]): unknown {
    let tag: string = "";

    for (let index = 0; index < value.length; index++) {
      tag +=
        '<a style="font-weight: bold; cursor: pointer;" class="linkTag">' +
        "#" +
        value[index] +
        "</a>&nbsp;&nbsp;&nbsp;";
    }
    return this.sanitizer.bypassSecurityTrustHtml(tag.trim());
  }
}
