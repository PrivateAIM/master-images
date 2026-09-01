FROM python:3.13
ARG DEBIAN_FRONTEND=noninteractive

# Uid/gid of the unprivileged runtime user. The primary group is root (gid 0)
# so the image also works when the runtime overrides the uid, as long as the
# writable paths below are used.
ARG APP_UID=1000
ARG APP_USER=analysis

RUN apt-get update && apt-get install -y locales wget gnupg lsb-release \
    && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
    && locale-gen en_US.UTF-8 \
    && update-locale LANG=en_US.UTF-8

ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

RUN apt-get update && apt-get install -y wget gnupg lsb-release \
    && mkdir -p /etc/apt/keyrings \
    && wget --quiet -O- https://www.postgresql.org/media/keys/ACCC4CF8.asc \
       | gpg --dearmor \
       | tee /etc/apt/keyrings/postgres.gpg > /dev/null \
    && echo "deb [signed-by=/etc/apt/keyrings/postgres.gpg] \
       http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" \
       > /etc/apt/sources.list.d/pgdg.list \
    && apt-get update \
    && apt-get install -y postgresql-14 postgresql-contrib \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# The cluster created by the Debian package lives in /var/lib/postgresql and is
# owned by the postgres user, which the unprivileged runtime user cannot start.
# It is replaced by a cluster in $PGDATA further down.
RUN pg_dropcluster --stop 14 main

COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip
RUN pip3 install -r /tmp/requirements.txt

COPY --from=samply/mainzelliste-rs:0.1.1 /usr/local/bin/mainzelliste /usr/local/bin/mainzelliste
RUN chmod +x /usr/local/bin/mainzelliste

RUN pip3 install git+https://github.com/PrivateAIM/python-sdk-patterns.git@0.6.5

ENV HOME=/home/${APP_USER}
ENV PGDATA=${HOME}/pgdata
ENV PGHOST=/tmp
ENV PATH=/usr/lib/postgresql/14/bin:${PATH}

RUN useradd --uid ${APP_UID} --gid 0 --home-dir ${HOME} --create-home --shell /bin/bash ${APP_USER} \
    && mkdir -p ${PGDATA} \
    && chown -R ${APP_UID}:0 ${HOME} \
    && chmod -R g+rwX ${HOME} \
    && chmod 0700 ${PGDATA}

USER ${APP_UID}

RUN initdb --username=postgres --auth=trust --encoding=UTF8 --locale=en_US.UTF-8 \
    && printf "unix_socket_directories = '/tmp'\nlisten_addresses = 'localhost'\n" \
       >> ${PGDATA}/postgresql.conf

WORKDIR ${HOME}
