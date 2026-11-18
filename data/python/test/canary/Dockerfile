FROM python:3.14-slim
ARG DEBIAN_FRONTEND=noninteractive

# Analyses run as uid 1000 and cannot write to site-packages or $HOME, so every
# runtime cache (bytecode, matplotlib font cache) has to be baked into the image.
ENV PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_ROOT_USER_ACTION=ignore \
    MPLBACKEND=Agg \
    MPLCONFIGDIR=/opt/mplconfig

COPY requirements.txt /tmp/requirements.txt

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends binutils; \
    pip install -r /tmp/requirements.txt; \
    site="$(python -c 'import sysconfig; print(sysconfig.get_path("purelib"))')"; \
    strip --strip-unneeded "$site"/opendp/lib/*.so; \
    find "$site" -type d \( -name tests -o -name test \) -prune -exec rm -rf {} +; \
    python -c 'import matplotlib.pyplot'; \
    chmod -R a+rwX "$MPLCONFIGDIR"; \
    apt-get purge -y --auto-remove binutils; \
    rm -rf /var/lib/apt/lists/* /tmp/requirements.txt

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends git; \
    pip install git+https://github.com/PrivateAIM/python-sdk-patterns.git@07a432440d6638f5b196479c380f0a8f96768257; \
    apt-get purge -y --auto-remove git; \
    rm -rf /var/lib/apt/lists/*
