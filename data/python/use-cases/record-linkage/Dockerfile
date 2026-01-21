FROM python:3.13
ARG DEBIAN_FRONTEND=noninteractive

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


COPY requirements.txt /tmp/requirements.txt

RUN python3 -m pip install --upgrade pip
RUN pip3 install -r /tmp/requirements.txt

COPY --from=samply/mainzelliste-rs:0.1.1 /usr/local/bin/mainzelliste /usr/local/bin/mainzelliste
RUN chmod +x /usr/local/bin/mainzelliste

RUN pip3 install git+https://github.com/PrivateAIM/python-sdk-patterns.git@0.4.1
