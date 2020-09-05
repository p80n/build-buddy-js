FROM node:14.9-alpine

#ENV USER=node
ENV DEBUG true

COPY --chown=node:node . /app


RUN mkdir /workdir && \
    chown node:node /workdir /app && \
    apk add git libseccomp krb5-libs && \
    apk add img --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

#USER $USER

RUN cd /app && \
    npm install

WORKDIR /app

CMD ["/app/bin/www"]
