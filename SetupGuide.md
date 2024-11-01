# Set Up Guide to get this project running on your computer

Table of Content

1. Introduction
2. Installation

# Introduction

PropertyLens is a website that aims to provide information for client who researching for their house purchases. We used technology like ReactJs for FrontEnd and FastAPI for BackEnd. We also integrated an AI model that would provide client with more useful information with Regression model for prediction and Classification model to classify house categories.

This guide will provide you an information on how to get this project to work in you own machine, which includes all installation and steps to train an AI model in your own machine.

# Installation

An Installation guide to get ths project working on your machine for both BackEnd and FrontEnd

## BackEnd

We had created a requirement.txt file that specify list of package needed to be install for the backend to work.
Their are 2 ways you could install all packages needed for this project:

1. Install with pip
2. Install with conda
3. Import API Tests to Postman (Optional)

### Install with pip

Make sure you are in project directory

```bash
cd <YourPath>/PropertyLens
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment

    a. Windows

    venv\Scripts\activate


    b. MacOS & Linux

    source venv/bin/activate

Install all package using requirements.txt

```bash
pip install -r requirements.txt
```

### Install with conda

Make sure you are in project directory

```bash
cd <YourPath>/PropertyLens
```

Create Virtual Environment

```bash
conda create -n propertylens python=3.12
```

Activate Virtual Environment

```bash
conda activate propertylens
```

Install all package using requirements.txt

```bash
conda install -r requirements.txt
```

### Import API Tests to Postman (Optional)

A guide to import test created for Back End with in Postman

1. Open Postman
2. Click Import
3. Find a file in this project folder -> PropertyLens_API_Postman_Test.json
4. Open or Select that file
5. Postman Tests had been imported to your workspace!

## FrontEnd

Install

```bash
npm install axios chart.js react-chartjs-2
npm install @mui/material @emotion/react @emotion/styled
```
