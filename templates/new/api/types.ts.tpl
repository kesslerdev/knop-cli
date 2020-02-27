---
to: src/api/<%= apiGroup %>/<%= version %>/<%= kind.toLowerCase() %>.api.ts
---
import { KubernetesObject, KubernetesListObject } from "knop";

export interface <%= kind %>Spec {
  size: number;
}

export interface <%= kind %>Status {
  size: number;
}

export interface <%= kind %> extends KubernetesObject {
  spec: <%= kind %>Spec;
  status: <%= kind %>Status;
}

export interface <%= kind %>List extends KubernetesListObject<<%= kind %>> {

}

export const CRDPath = "./deploy/crds/<%= crdPath %>_crd.yaml";
