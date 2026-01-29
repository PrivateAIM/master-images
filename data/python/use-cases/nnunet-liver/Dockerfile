FROM nvidia/cuda:11.8.0-runtime-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends\
    git \
    wget \
    python3 \
    python3-pip \
    libx11-6 \
    ca-certificates \
    linux-libc-dev \
    libtiff5-dev \
    libwrap0-dev \
    libxcomposite1 \
    libxcursor1 \
    libxi-dev \
    libxkbcommon-x11-0 \
    mesa-common-dev \
    libssl-dev \
    libglu1-mesa-dev \
    libxt-dev \
    libgomp1 \
    qtbase5-dev \
    qtscript5-dev \
    libqt5svg5-dev \
    libqt5opengl5-dev \
    libqt5xmlpatterns5-dev \
    qtwebengine5-dev \
    qttools5-dev \
    libqt5x11extras5-dev \
    qtxmlpatterns5-dev-tools \
    libqt5webengine-data \
    at-spi2-core \
    libxcb-cursor0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir torch==2.7.1 torchvision==0.22.1 --index-url https://download.pytorch.org/whl/cu118
    
RUN pip install --no-cache-dir pydicom==3.0.1 SimpleITK==2.5.2

WORKDIR /app

RUN mkdir -p nnunetv1 mitk 

RUN wget --no-check-certificate https://github.com/MITK/MITK/releases/download/v2025.08/MITK-v2025.08-ubuntu_22_04-x86_64.tar.gz -O /app/mitk.tar.gz \
    && tar -xzf /app/mitk.tar.gz --strip 1 -C /app/mitk/ MITK-v2025.08-linux-x86_64 \
    && rm -rf /app/mitk.tar.gz

RUN git clone --branch nnunetv1 https://github.com/MIC-DKFZ/nnUNet.git ./nnunetv1

COPY nnunetv1.patch ./nnunetv1/nnunetv1.patch

RUN cd nnunetv1 && git apply --ignore-space-change --ignore-whitespace nnunetv1.patch
RUN pip3 install --no-cache-dir -e ./nnunetv1

ENV nnUNet_input="/nnUNet_input" 
ENV nnUNet_output="/nnUNet_output"
ENV RESULTS_FOLDER="/nnUNet_results_folder"

ENV TASK_NAME=Task029_LiTS
ENV MULTI_MODAL=False
RUN nnUNet_download_pretrained_model $TASK_NAME

RUN pip3 install git+https://github.com/PrivateAIM/flame-patterns.git@0.2.4


