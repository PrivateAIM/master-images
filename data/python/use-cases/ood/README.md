# Python OOD Image

Prebuilt Python 3 image for `OOD`.

# Out-of-Distribution (OOD) Anomaly Detection

This project uses **[PatchCore3D](https://github.com/DFrolova/PatchCore3D)** for anomaly detection tasks in 3D medical imaging.  
It leverages a pre-trained model provided by **[yAwareContrastiveLearning](https://github.com/Duplums/yAwareContrastiveLearning)**.

## Pre-trained Model

The pre-trained model used in this project is obtained from the yAwareContrastiveLearning repository:

- [Download link](https://drive.google.com/uc?id=1BmDC4USdZmX0ZSi-jQyUVmKHaDFIJFo2)

### License for Pre-trained Model

The pre-trained model is distributed under the **CeCILL-B License**.  
For full license details, please refer to: [CeCILL-B V1](http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.html)

You are allowed to use, modify, and redistribute the model under the conditions described in the license. Please ensure that any usage complies with the CeCILL-B terms.

## Code Licenses

This project incorporates code from the following repository:

- **PatchCore3D** ([DFrolova/PatchCore3D](https://github.com/DFrolova/PatchCore3D))  
  *License:* MIT License (included in this repository as [`LICENSE`](./LICENSE))  

PatchCore3D internally incorporates or adapts code from the following repositories:

- **PatchCore Inspection** ([amazon-science/patchcore-inspection](https://github.com/amazon-science/patchcore-inspection))  
  *License:* Apache License 2.0

- **Constrained Anomaly Segmentation** ([jusiro/constrained_anomaly_segmentation](https://github.com/jusiro/constrained_anomaly_segmentation))  
  *License:* MIT License

- **yAwareContrastiveLearning** ([Duplums/yAwareContrastiveLearning](https://github.com/Duplums/yAwareContrastiveLearning))  
  *License:* CeCILL-B License

- **CGV MOOD 2022** ([2na-97/CGV_MOOD2022](https://github.com/2na-97/CGV_MOOD2022))  
  *License:* Not specified in original repository; only used internally via PatchCore3D 

- **IFL Unsupervised Anomaly Detection** ([snavalm/ifl_unsup_anom_det](https://github.com/snavalm/ifl_unsup_anom_det))  
  *License:* MIT License (modified for PatchCore3D)

- **mDDPM** ([hasan1292/mDDPM](https://github.com/hasan1292/mDDPM))  
  *License:* MIT License (modified for PatchCore3D)

- **AnoDDPM** ([Julian-Wyatt/AnoDDPM](https://github.com/Julian-Wyatt/AnoDDPM))  
  *License:* MIT License (modified for PatchCore3D)

> Note: In this project we **only use PatchCore3D directly**, and all other code is included via PatchCore3D. Some of these repos have been slightly modified within PatchCore3D to run properly.


Please ensure that any use of this project complies with the terms of the above licenses.

## Acknowledgements

- PatchCore3D authors: [DFrolova](https://github.com/DFrolova/PatchCore3D)  
- yAwareContrastiveLearning authors: [Duplums](https://github.com/Duplums/yAwareContrastiveLearning)  
- PatchCore Inspection authors: [Amazon Science](https://github.com/amazon-science/patchcore-inspection)

## Citing

This project builds upon **PatchCore3D**. If you use ideas, code, or models from this project in your work, please cite the original PatchCore3D paper:

Frolova, D., Katrutsa, A., & Oseledets, I. (2023). *Feature-Based Pipeline for Improving Unsupervised Anomaly Segmentation on Medical Images*. In **International Workshop on Uncertainty for Safe Utilization of Machine Learning in Medical Imaging** (pp. 115–125). Springer.
