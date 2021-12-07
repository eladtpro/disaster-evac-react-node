variable "rgName" {
  type = string
}

locals {
  location = "westeurope"
#  rgName   = "rg-saga"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "resource-group" {
  name     = var.rgName
  location = local.location
}
