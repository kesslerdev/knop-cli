---
to: <%= packageName %>/build/bin/entrypoint
sh: "cat > /dev/null && chmod +x <%= cwd %>/<%= packageName %>/build/bin/entrypoint"
---
#!/bin/sh -e

# This is documented here:
# https://docs.openshift.com/container-platform/3.11/creating_images/guidelines.html#openshift-specific-guidelines

if ! whoami &>/dev/null; then
  if [ -w /etc/passwd ]; then
    echo "${USER_NAME:-<%= packageName %>}:x:$(id -u):$(id -g):${USER_NAME:-<%= packageName %>} user:${HOME}:/sbin/nologin" >> /etc/passwd
  fi
fi

exec /sbin/tini -- node ${OPERATOR} $@
