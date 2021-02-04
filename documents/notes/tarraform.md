# Terraform


## Intro

## AWS Setup


## Windows Setup
[Download Terraform](https://www.terraform.io/downloads.html)
Set a system variable in winndows machine

## Mac Setup
[Home brow](https://brew.sh/)

    brew install terraform
    terraform -v

## Linux Install

[Download Terraform](https://www.terraform.io/downloads.html)

    cd Download
    unzip terraform_0.14.5_linux_amd64.zip
    sudo mv terraform /usr/local/bin/
    terraform -v

## [VSCode](https://code.visualstudio.com/)




## Terraform Overview
[main.tf](./main.tf)

    provider "aws" {
        region = "us-east-1"
        access_key = "value"
        secret_key = "value"
    }

    resource "<provider>_<resourcetype>" "name" {
        config options.....
        key = "value"
        key2 = "another value"

#
    terraform init
    terraform plan



## Modifying Resources

    terraform apply

## Deleting Resources

    tareaform distory
## Referencing Resources

## Terraform Files

## Practice Project
[apache](./apache.tf)
1. Create a VPC
   

2. Create Internet Gateway
3. Create custom Route Table
4. Create a subnet
5. Accociate subnet with a Route Table
6. Create a security Group to allow port 22, 80, 443
7. Create a network interface wiht an ip in the subnets that was create in step 4
8. Assign an elastic IP to the network interface that was created in step 7
9.  Create Ubentu server and install/enable apache?
    

> EC2 > key pair > [name] > create key pair > 

    terraform destory --auto-approve


## Terraform State Commands
    tarrpform state list
    tarrpform state show aws_eip.one
## Terraform Output

    output "server_public_ip"{
        value = aws_eip.one.public_ip
    }

##
    terraform refrash

## Target Resources
    terraform destory -target aws_instance.web-server-instance
    terraform apply -target aws_instance.web-server-instance


## Terraform Variables

    tarraform apply --

