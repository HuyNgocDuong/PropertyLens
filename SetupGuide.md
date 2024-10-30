# Set Up Guide to get this project running on your Machine

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
2. Install with conda (If you have Anaconda installed)

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

## FrontEnd

Install

```bash
npm install axios chart.js react-chartjs-2
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom
```

### How to run React App on you Local Machine

Change Directory to react app folder

```bash
cd <Your_Path>/PropertyLens/FrontEnd/PropertyLens-Website
```

Install React dependencies

```bash
npm install
```

Run React Application

```bash
npm run dev
```
