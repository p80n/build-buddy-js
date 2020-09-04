FROM node:14.9-alpine



RUN mkdir /workdir && \
    mkdir /app &&  \
    chown node:node /workdir /app && \
    apk add git libseccomp && \
    apk add img --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

ENV USER=node

USER $USER



COPY --chown=node:node . /app





