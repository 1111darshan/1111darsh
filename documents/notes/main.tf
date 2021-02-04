provider "aws" {
    region = "us-east-1"
    access_key = "value"
    secret_key = "value"
}

resource "aws_instance" "my-firstserver" {
    ami = "ami-01ab4a3bc7e75f44a"
    instance_type = "t2-micro"
    tags = {
      "Name" = "Myfirstinstance"
    }
}


resource "aws_vpc" "first-vpc" {
    cidr_block = "10.0.0.0/16"
    tags = {
      "Name" = "New VPC"
    }
  
}

resource "aws_subnet" "public-subnet1" {
    vpc_id = aws_vpc.first-vpc.id
    cidr_block = "10.0.0.1/24"
    tags = {
      "Name" = "proud-subnat"
    }
  
}