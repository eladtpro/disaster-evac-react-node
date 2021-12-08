variable "rgName" {
  type = string
}

locals {
  location = "westeurope"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg-name" {
  name     = var.rgName
  location = local.location
}

resource "azurerm_static_site" "stapp-reactjs" {
  name                = "stapp-reactjs"
  resource_group_name = azurerm_resource_group.rg-name
  location            = local.location
  sku_tier            = "Standard"
}
