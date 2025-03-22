FROM python:3.10
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get dist-upgrade -yqq && \
    apt-get install -yqq git

COPY requirements.txt /tmp/requirements.txt

COPY --from=ghcr.io/astral-sh/uv:0.6.9 /uv /uvx /bin/

RUN uv pip install --system -r /tmp/requirements.txt

RUN uv pip install --system git+https://github.com/PrivateAIM/python-sdk.git@065a759d31d582d62cbfedb39beec18625bca165
