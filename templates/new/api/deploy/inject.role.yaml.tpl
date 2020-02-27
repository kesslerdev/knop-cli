---
inject: true
to: deploy/role.yaml
skip_if: <%= apiGroup %>
append: true
---
- apiGroups:
  - <%= apiGroup %>
  resources:
  - '*'
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch