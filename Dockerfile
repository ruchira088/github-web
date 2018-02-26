FROM node

RUN apt-get update && \
    apt-get install curl apt-transport-https -y

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install yarn -y

WORKDIR /opt/github-web

COPY . .

RUN yarn install

ENTRYPOINT ["yarn"]

CMD ["start"]