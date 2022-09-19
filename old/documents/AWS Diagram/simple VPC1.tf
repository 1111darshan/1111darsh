provider "aws" {
  region = "ap-south-1"
  access_key = var.access_key
  secret_key = var.secret_key
  
}

resource "aws_vpc" "main-vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    "Name" = "Main-vpc VPC"
  }

}

resource "aws_subnet" "public-sub-1" {
    vpc_id = aws_vpc.main-vpc.id
    cidr_block = "10.0.1.0/24"
    availability_zone = "ap-south-1a"
  
}

resource "aws_subnet" "public-sub-2" {
    vpc_id = aws_vpc.main-vpc.id
    cidr_block = "10.0.2.0/24"
    availability_zone = "ap-south-1a"
  
}
resource "aws_subnet" "private-sub-1" {
    vpc_id = aws_vpc.main-vpc.id
    cidr_block = "10.0.3.0/24"
    availability_zone = "ap-south-1b"
  
}
resource "aws_subnet" "private-sub-2" {
    vpc_id = aws_vpc.main-vpc.id
    cidr_block = "10.0.4.0/24"
    availability_zone = "ap-south-1b"
  
}


resource "aws_network_acl" "public-sub-1-nacl" {
  vpc_id = aws_vpc.main-vpc.id
  subnet_ids = [ aws_subnet.public-sub-1.id ]
}

resource "aws_network_acl" "public-sub-2-nacl" {
  vpc_id = aws_vpc.main-vpc.id
  subnet_ids = [ aws_subnet.public-sub-2.id ]
}

resource "aws_network_acl" "private-sub-1-nacl" {
  vpc_id = aws_vpc.main-vpc.id
  subnet_ids = [ aws_subnet.private-sub-1.id ]
}

resource "aws_network_acl" "private-sub-2-nacl" {
  vpc_id = aws_vpc.main-vpc.id
  subnet_ids = [ aws_subnet.private-sub-2.id ]
}

