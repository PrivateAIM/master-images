FROM python:3.12

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -yqq && \
    apt-get install -yqq \
        git \
        libglib2.0-0 \
        libgl1 \
        libx11-6 \
        libxrender1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m pip install --upgrade pip

RUN pip3 install --no-cache-dir gdown

RUN git clone https://github.com/DFrolova/PatchCore3D.git PatchCore3D && \
    git -C PatchCore3D checkout 184a68b4935a3a5925005098317e82dce76c4c5e

RUN mkdir -p PatchCore3D/src/model && \
    gdown "https://drive.google.com/uc?id=1BmDC4USdZmX0ZSi-jQyUVmKHaDFIJFo2" \
    -O PatchCore3D/src/model/DenseNet_HCP_IXI_window-0.25_0_epoch_30.pth

COPY dimensions.patch PatchCore3D/dimensions.patch

RUN git -C PatchCore3D apply dimensions.patch

RUN pip3 install --no-deps ./PatchCore3D

COPY requirements.txt /tmp/requirements.txt

RUN pip3 install -r /tmp/requirements.txt

RUN pip3 install git+https://github.com/PrivateAIM/python-sdk-patterns.git@1.2.1
