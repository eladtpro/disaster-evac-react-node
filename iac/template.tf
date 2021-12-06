#variable "ResouceGroupName" {
#  type = string
#}

locals {
  location = "westeurope"
  rgName   = "rg-saga"
}

provider "azurerm" {
  features {}
}

#data "azurerm_key_vault_secret" "userName" {
#  name         = var.userNameSecret
#  key_vault_id = var.kvId
#}

resource "azurerm_resource_group" "resource-group" {
  name     = local.rgName
  location = local.location
}
