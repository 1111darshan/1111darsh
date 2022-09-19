provider "aws" {
  region = "ap-south-1"
  access_key = var.access_key
  secret_key = var.secret_key
  
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    "Name" = "Main VPC"
  }

}

resource "aws_subnet" "Public" {
  vpc_id = aws_vpc.main.id
  cidr_block = "10.0.0.0/24"

  tags = {
    "Name" = "Public-Subnet"
  }
}

resource "aws_subnet" "Private" {
  vpc_id = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"

  tags = {
    "Name" = "Private-Subnet"
  }
}

resource "aws_internet_gateway" "i-gate-way" {
  vpc_id = aws_vpc.main.id
  tags = {
    "Name" = "Main-internet-gateway"
  }
  
}

resource "aws_route_table" "main-route-table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.i-gate-way.id
  }

  route {
    ipv6_cidr_block = "::/0"
    gateway_id = aws_internet_gateway.i-gate-way.id
  }

  tags = {
    Name = "Routetabe"
  }
}


resource "aws_route_table_association" "a" {
  subnet_id = aws_subnet.Public.id
  route_table_id = aws_route_table.main-route-table.id
}