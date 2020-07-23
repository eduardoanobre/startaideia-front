export class NovaFerramenta {
  title: string;
  description: string;
  link: string;
  tags: string[];

  constructor(formValue: RawFormNovaFerramentaValue) {
    this.title = formValue.title;
    this.description = formValue.description;
    this.link = formValue.link;
    this.tags = formValue.tags;
  }
}

export interface RawFormNovaFerramentaValue {
  title: string;
  description: string;
  link: string;
  tags: string[];
}
