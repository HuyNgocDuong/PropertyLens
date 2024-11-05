# Set Up Guide to get this project running on your Machine

Table of Content

1. Introduction
2. Installation and How to Guide
3. DataBase Simulation with Google Spread Sheet

# Introduction

PropertyLens is a website that aims to provide information for client who researching for their house purchases. We used technology like ReactJs for FrontEnd and FastAPI for BackEnd. We also integrated an AI model that would provide client with more useful information with Regression model for prediction and Classification model to classify house categories.

This guide will provide you an information on how to get this project to work in you own machine, which includes all installation and steps to train an AI model in your own machine.

# Installation and How to Guide

An Installation guide to get this project working and run on your machine for both BackEnd and FrontEnd

## BackEnd

We had created a requirement.txt file that specify list of package needed to be install for the backend to work.
Their are 2 ways you could install all packages needed for this project:

1. Install with pip
2. Install with conda (If you have Anaconda installed)
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

### How to run FastAPI on your Local Machine

Run model.py to create PKL file of our Model in your machine

```bash
python model.py
```

Run Back End server with Uvicorn

```bash
uvicorn main:app --reload
```

### Import API Tests to Postman (Optional)

A guide to import test created for Back End with in Postman

1. Open Postman
2. Click Import
3. Find a file in this project folder -> PropertyLens_API_Postman_Test.json
4. Open or Select that file
5. Postman Tests had been imported to your workspace!

## FrontEnd

All installation for Front End React App should be done from the start, you shouldn't need to install these. (Optional: Run this command to ensure all packages are installed.)

```bash
npm install axios chart.js react-chartjs-2 chartjs-plugin-zoom @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom react-icons
```

### How to run React App on your Local Machine

1. Change Directory to react app folder

```bash
cd <Your_Path>/PropertyLens/FrontEnd/PropertyLens-Website
```

2. Install React dependencies

```bash
npm install
```

3. Run React Application

```bash
npm run dev
```

# DataBase Simulation with Google Spread Sheet

In our About Page, there will be a form where user could enter their Name, Email and Message.

Submit this form will send data to our simulate database using Google Spread Sheet.

The link could be found below:

https://docs.google.com/spreadsheets/d/1lz7Em5GBp3CWv2Jr8mPjzD2-zRtV3P-9c7x4wnaozS8/edit?usp=sharing
