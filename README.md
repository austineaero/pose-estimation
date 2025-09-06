# PEGA: Pose Estimation for Gait Analysis

**Author:** Augustine Osaigbevo

---

## Table of Contents

* [Project Description](#project-description)
* [Repository Structure](#repository-structure)
* [Instructions (How to Run)](#instructions-how-to-run)
* [Technical Approach](#technical-approach)
* [Results & Performance](#results--performance)
* [Challenges & Mitigations](#challenges--mitigations)
* [Next Steps](#next-steps)
* [Credits](#credits)

---

## Project Description

Pose Estimation for Gait Analysis (PEGA) is a state-of-the-art system that analyses CCTV streams to detect passengers who may need mobility assistance in airport terminals. It combines person detection & tracking, pose estimation, gait cycle feature extraction, and a CNN classifier to flag *abnormal gait* in near-real-time. The concept targets *on-premise* deployment for low latency, safety and privacy.



### Why this matters (Impact)

- **Safety:** Earlier detection of potential mobility issues reduces risk in crowded terminals and enables proactive assistance before an incident.
- **Cost & Operations:** Predictive, on-demand assistance reduces dependence on pre-booked services and third-party callouts, cutting disruptions in terminal flows and improving **service-level adherence** (wait time to assist, time-to-escort, etc.).
- **Passenger Experience:** A more dignified, seamless journey for older passengers and people with disabilities — aligned with accessibility commitments.

---

## Repository Structure

```

apps/                     # Django web front-end / admin prototype (login, pages, charts)
front-test/               # Front-end experiments / static assets (early UI tests)
PEGASystem.zip            # Django project bundle (unzip to run the local site)
pega\_system\_gdp.ipynb     # End-to-end pipeline notebook (detection → pose → gait → classify)
model\_220322.h5           # Trained CNN classifier (Keras .h5)
dummy\_normal.mp4          # Simulated normal-gait crowd clip (Mixamo)
dummy\_injured.mp4         # Simulated abnormal-gait subject clip (Mixamo)
README.md                 # This file

````

> Note: the **Django** site in `PEGASystem.zip` is the quickest way to demo the UI. The **pipeline** is illustrated in `pega_system_gdp.ipynb`.

---

## Instructions (How to Run)

### A) Run the Web Demo (Django)

1. **Unzip the site**
   - Extract `PEGASystem.zip` so you have a `PEGASystem/` folder.

2. **Install Python deps (example)**
   ```bash
   python3 -m venv .venv && source .venv/bin/activate
   pip install django
````

> If the project uses extra packages, install them as prompted (e.g., `pip install pillow`, etc.).

3. **Migrate & run**

   ```bash
   cd PEGASystem
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```

4. **Login (default)**

   * Username: `admin`
   * Password: `12345`
   * (Create your own admin with `python manage.py createsuperuser`.)

### B) Run the Gait Pipeline (Notebook)

1. **Environment**

   ```bash
   python3 -m venv .venv && source .venv/bin/activate
   pip install numpy opencv-python matplotlib scikit-image scikit-learn tensorflow
   # For AlphaPose / person detection you’d normally use PyTorch + YOLO; see notes below.
   ```

2. **Open the notebook**

   * Launch Jupyter / VS Code and run `pega_system_gdp.ipynb` top-to-bottom.
   * Sample videos: `dummy_normal.mp4`, `dummy_injured.mp4`.

> **GPU note:** Pose estimation is compute-intensive. For production, use a CUDA GPU box on-prem (airport datacentre).

---

## Technical Approach

### 1) Person Detection & Tracking

* Detect people in each frame and **persist identity across frames** (tracking+ReID) so each subject’s motion can be analysed as a single temporal sequence.

### 2) Pose Estimation (Skeletal Keypoints)

* For each tracked person, estimate 2D keypoints per frame (e.g., hips, knees).
* Output: per-frame **skeleton JSON** (ID, bbox, score, keypoints).

### 3) Gait Cycle Feature Extraction

* Convert keypoints to **joint angles** over a **0–100% gait cycle**.
* Smooth and **normalize** curves; stack hip/knee signals into a fixed 2D “**gait signature**” (e.g., 20×20), robust to speed changes.

### 4) Classification (Normal vs Abnormal)

* A lightweight **CNN** (LeNet-style) trained on gait signatures from **healthy** (OU-MVLP pose) and curated **abnormal** clips (amputees, injuries, neurological patterns).
* Output: **binary class** with confidence.

### 5) System Integration & UI

* **Pipeline** script/notebook for E2E testing.
* **Django** web app to visualize detections, camera streams, and case logs.
* **On-prem** deployment architecture for privacy, latency, and resilience.

---

## Results & Performance

### Simulated Crowd (Mixamo)

* 9 subjects (8 normal, 1 abnormal): the abnormal subject is correctly flagged in real time; normal subjects produce stable, “double-band” gait signatures.

### Real-World Corridor Video

* Multiple subjects walking towards camera; system flags the expected abnormal gait case and leaves others unflagged.

### Classifier Metrics

* On a 30-subject test (20 normal / 10 abnormal): **Accuracy 96.7%**, **F1 ≈ 0.947**; 1 false negative noted (abnormal predicted normal).
  *Interpretation:* errors shrink with clearer lateral views and adequate sequence length; false negatives are mitigated by re-scoring over longer windows.

> Airport-level impact: as observation increases (more frames), prediction uncertainty narrows — enabling **safer** decisions (earlier staff dispatch) and **lower cost** (fewer unnecessary interventions).

---

## Challenges & Mitigations

| Challenge                             | Mitigation                                                                                                        |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Pose noise, occlusion, crowded scenes | Use robust detectors, ReID tracking, and require a **minimum window** before classification.                      |
| Dataset gaps for specific conditions  | Curate targeted clips; expand with clinical partners; gradually grow **multiclass** labels.                       |
| Camera perspective variance           | Prefer **lateral views** along corridors; fuse multi-camera angles where available.                               |
| Privacy & governance                  | Keep on **airport datacentre**; log only non-identifying gait signatures; strict retention and role-based access. |
| Throughput on CPU                     | Deploy on GPU nodes; batch processing; stream-wise frame throttling.                                              |

---

## Next Steps

* **Multiclass classification** (Parkinsonian, hemiparetic, steppage patterns, etc.) and calibrated uncertainty.
* **Data partnerships** to obtain ethically governed, consented datasets for mobility conditions across **age, gender, assistive devices**.
* **MLOps**: continuous re-training, drift monitoring, A/B evaluation, and human-in-the-loop review.
* **Multi-camera fusion** and **edge gateways** feeding an on-prem cluster; hard latency budgets for live operations.
* **Operational analytics**: SLA dashboards (time-to-assist), heatmaps of flags, and staff workload balancing.

---

## Credits

* OU-MVLP Pose dataset (skeleton sequences), AlphaPose / YOLO / ReID (detection & tracking)
* Adobe Mixamo (sim clips for normal/abnormal gait)
* **Design Team:** Augustine Osaigbevo, Gexuan Feng, Nicolas Guzman, Anthony Juel, Sushrut Pakhale
