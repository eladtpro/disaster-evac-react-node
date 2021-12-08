variable "rgName" {
  type = string
}

locals {
  location = "westeurope"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "saga" {
  name     = var.rgName
  location = local.location
}

resource "azurerm_static_site" "saga" {
  name                = "stapp-reactjs"
  resource_group_name = azurerm_resource_group.saga.name
  location            = azurerm_resource_group.saga.location
  sku_tier            = "Standard"
}


resource "azurerm_log_analytics_workspace" "saga" {
  name                = "log-apm"
  location            = azurerm_resource_group.saga.location
  resource_group_name = azurerm_resource_group.saga.name
  sku                 = "PerGB2018"
  retention_in_days   = 7
}

resource "azurerm_application_insights" "saga" {
  name                = "appi-apm"
  location            = azurerm_resource_group.saga.location
  resource_group_name = azurerm_resource_group.saga.name
  workspace_id        = azurerm_log_analytics_workspace.saga.id
  application_type    = "other"
}

output "app_id" {
  value = azurerm_application_insights.saga.app_id
}

resource "azurerm_storage_account" "saga" {
  name                     = "stacctfunctions"
  resource_group_name      = azurerm_resource_group.saga.name
  location                 = azurerm_resource_group.saga.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_app_service_plan" "saga" {
  name                = "api-appserviceplan-pro"
  location            = azurerm_resource_group.saga.location
  resource_group_name = azurerm_resource_group.saga.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Standard"
    size = "S1"
  }
}

resource "azurerm_function_app" "saga" {
  name                = "func-saga-app"
  resource_group_name = azurerm_resource_group.saga.name
  location            = azurerm_resource_group.saga.location

  app_service_plan_id        = azurerm_app_service_plan.saga.id
  storage_account_name       = azurerm_storage_account.saga.name
  storage_account_access_key = azurerm_storage_account.saga.primary_access_key
#  app_settings {
#    APPINSIGHTS_INSTRUMENTATIONKEY = azurerm_application_insights.saga.instrumentation_key
#  }
}

resource "azurerm_cosmosdb_account" "saga" {
  name                = "cosmos-acct-saga"
  location            = azurerm_resource_group.saga.location
  resource_group_name = azurerm_resource_group.saga.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  enable_automatic_failover = true

  capabilities {
    name = "EnableAggregationPipeline"
  }

  capabilities {
    name = "mongoEnableDocLevelTTL"
  }

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 10
    max_staleness_prefix    = 200
  }

  geo_location {
    location          = azurerm_resource_group.saga.location
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_sql_database" "saga" {
  name                = "db-actions"
  resource_group_name = azurerm_resource_group.saga.name
  account_name        = azurerm_cosmosdb_account.saga.name
  throughput          = 400
}

resource "azurerm_cosmosdb_sql_container" "saga" {
  name                  = "items"
  resource_group_name   = azurerm_cosmosdb_account.saga.resource_group_name
  account_name          = azurerm_cosmosdb_account.saga.name
  database_name         = azurerm_cosmosdb_sql_database.saga.name
  partition_key_path    = "/operation_id"
  partition_key_version = 1
  throughput            = 400

  indexing_policy {
    indexing_mode = "Consistent"

    included_path {
      path = "/*"
    }

    included_path {
      path = "/included/?"
    }

    excluded_path {
      path = "/excluded/?"
    }
  }

  #  unique_key {
  #    paths = ["/definition/idlong", "/definition/idshort"]
  #  }
}

resource "azurerm_servicebus_namespace" "saga" {
  name                = "sbt-saga-orchestrator"
  location            = azurerm_resource_group.saga.location
  resource_group_name = azurerm_resource_group.saga.name
  sku                 = "Standard"

  tags = {
    source = "terraform"
  }
}

resource "azurerm_servicebus_queue" "saga" {
  name                = "evac-process-q"
  resource_group_name = azurerm_resource_group.saga.name
  namespace_name      = azurerm_servicebus_namespace.saga.name

  enable_partitioning = false
}

resource "azurerm_signalr_service" "saga" {
  name                = "sigr-backchannel"
  location            = azurerm_resource_group.saga.location
  resource_group_name = azurerm_resource_group.saga.name

  sku {
    name     = "Standard_S1"
    capacity = 1
  }

  cors {
    allowed_origins = ["*"]
  }

  features {
    flag  = "ServiceMode"
    value = "Default"
  }

  #  upstream_endpoint {
  #    category_pattern = ["connections", "messages"]
  #    event_pattern    = ["*"]
  #    hub_pattern      = ["hub1"]
  #    url_template     = "http://foo.com"
  #  }
}
