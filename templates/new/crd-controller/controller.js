---
to: src/controllers/<%= apiGroup %>/<%= version %>/<%= kind.toLowerCase() %>.controller.ts
---
<%_
    kindPlural = h.inflection.pluralize(kind)
    kindPluralLower = kindPlural.toLowerCase()
_%>
import { CRDController } from "knop";
import { <%= kind %>, <%= kind %>Status } from "../../../api/<%= apiGroup %>/<%= version %>/<%= kind.toLowerCase() %>.api";

export default class <%= kind %>Controller extends CRDController {
  protected kind: string = "<%= kind %>";
  protected apiGroup: string = "<%= apiGroup %>";
  protected apiVersion: string = "<%= version %>";
  protected pluralName: string = "<%= kindPluralLower %>";

  protected async handleCreation(object: <%= kind %>): Promise<<%= kind %>Status> {
    this.logger.info("CREATE");

    return { size: object.spec.size };
  }

  protected async handleModification(object: Elasticsearch, diff: DiffResult): Promise<ElasticsearchStatus> {
    this.logger.info("UPDATE");
    this.logger.info(diff);

    return { size: object.spec.size };
  }

  protected async handleDeletion(object: <%= kind %>): Promise<boolean> {
    this.logger.info("DELETE");

    return true;
  }
}
