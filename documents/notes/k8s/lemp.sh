#!/bin/bash


# This is a script to install LEMP stack on Ubuntu

# Update Ubuntu system
sudo apt update
sudo apt upgrade -y

# Install nginx server
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
cp ./[front-end code] /var/www/html/


# install python and pip
sudo apt install python3 -y
sudo apt install python3-pip -y


# Install a requiremets files
pip3 install -r requirements.txt


# Install MySQL server
sudo apt install mysql-server -y
