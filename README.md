# Application end-to-end Insights
[![N|Azure Portal](https://github.com/eladtpro/disaster-evac-react-node/blob/main/.readme/azure.svg?raw=true)](https://ms.portal.azure.com/) [![N|Azure Application Insights](https://github.com/eladtpro/disaster-evac-react-node/blob/main/.readme/AppInsights.png?raw=true)](https://azure.microsoft.com/en-us/services/monitor) [![N|CosmosDB](https://github.com/eladtpro/disaster-evac-react-node/blob/main/.readme/CosmosDB.png?raw=true)](https://azure.microsoft.com/en-us/services/cosmos-db) [![N|Azure Functions](https://github.com/eladtpro/disaster-evac-react-node/blob/main/.readme/FunctionApp.png?raw=true)](https://azure.microsoft.com/en-us/services/functions) [![N|Service Bus](https://github.com/eladtpro/disaster-evac-react-node/blob/main/.readme/ServiceBus.png?raw=true)](https://azure.microsoft.com/en-us/services/service-bus) [![N|Azure SignalR Service](https://github.com/eladtpro/disaster-evac-react-node/blob/main/.readme/SignalR.png?raw=true)](https://azure.microsoft.com/en-us/services/signalr-service) [![N|Static Web Apps](https://github.com/eladtpro/disaster-evac-react-node/blob/main/.readme/StaticWebApp.png?raw=true)](https://azure.microsoft.com/en-us/services/app-service/static) [![N|Storage](https://github.com/eladtpro/disaster-evac-react-node/blob/main/.readme/StorageAccount.png?raw=true)](https://azure.microsoft.com/en-us/product-categories/storage)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

A Monitoring demo aimed at the development team; A Saga distributed transaction application flow scenario on a dockerized microservices environment.
A Flow from client to the backend, use event system, and client socket backchannel. Use of W3C correlation keys for the coordinated
application flow

Monitor live application for performance anomalies, analytics, and user/request flows. Diagnose issues by using request/dependency logging, performance/diagnostics sampling, and client logging.
 
Application Insights, a feature of Azure Monitor, is an extendable Application Performance Management (APM) service for developers and DevOps professionals. Connects global clouds with on-prem solutions.
Supplies automatic integration in both; SPA clients and containerized backend services using configuration only.
Introduce Application-map, Live profiler, Smart detection, Transaction view, Usage analysis, and Alerts.


___

## Azure Pass
> To redeem a promo code, visit [microsoftazurepass.com](https://www.microsoftazurepass.com/) and follow these [Azure Pass redemption instructions](https://www.microsoftazurepass.com/Home/HowTo) 

___
## Prerequisites


##### WSL2
* Install
    `wsl --install`

* Home directory
    `\\wsl$`

##### Visual Studio Code

###### Azure Functions Core Tools
> Source: [Work with Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Clinux%2Ccsharp%2Cportal%2Cbash%2Ckeda#install-the-azure-functions-core-tools)

* Install the Microsoft package repository GPG key, to validate package integrity
    `curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg`
    `sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg`

* Set up the APT source list before doing an APT update (Ubuntu)
    `sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/microsoft-ubuntu-$(lsb_release -cs)-prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list'`

* Check the /etc/apt/sources.list.d/dotnetdev.list file for one of the appropriate Linux version strings listed below:

| Linux distribution        | Version |
| -----------               | ----------- |
| Ubuntu 20.04              | `focal`     |
| Ubuntu 18.10              | `cosmic`    |

* Start the APT source update
    `sudo apt-get update`
* Install the Core Tools package
    `sudo apt-get update`
    `sudo apt-get install azure-functions-core-tools-4`

##### Azure Environment

[Azure Command-Line Interface (CLI) - Overview | Microsoft Docs](https://docs.microsoft.com/en-us/cli/azure/)

* Install Azure CLI: 
    `curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash`
* Log in to Azure:
    `az login`

##### Terraform

###### Install
* Configure your system to trust that HashiCorp key for package authentication
`curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -`
* Add the official HashiCorp repository to your system
`sudo apt-add-repository "deb [arch=$(dpkg --print-architecture)] https://apt.releases.hashicorp.com $(lsb_release -cs) main"`
* Install package
`sudo apt install terraform`


###### Commands

[Terraform Command Registry - AZURERM DOCUMENTATION](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)

* Format template
    `terraform fmt`
* Initialize Terraform (one time)
    `terraform init`
* Plan the deployment
    `terraform plan -var "rgName=rg-saga"`
* Deploy/Excecute template
    `terraform apply -var "rgName=rg-saga" -auto-approve`   
* show the curremt state of the resources
    `terraform show` 
    `terraform knows about`

##### PowerShell (Optional)

* Update the list of packages
    `sudo apt-get update`
* Install pre-requisite packages.
    `sudo apt-get install -y wget apt-transport-https software-properties-common`
* Download the Microsoft repository GPG keys
    `wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb`
* Register the Microsoft repository GPG keys
    `sudo dpkg -i packages-microsoft-prod.deb`
* Update the list of packages after we added packages.microsoft.com
    `sudo apt-get update`
* Install PowerShell
    `sudo apt-get install -y powershell`
* Start PowerShell
    `pwsh`

___
## Flow

> Happens for each status change

| #   | Action          | Source                      | Destination                 |
| --  | -----------     | -----------                 | -----------                 |
| 1   | Send Change     | `reactjs`                   | `queue-change (func)`       |
| 2   | Queue Change    | `queue-change (func)`       | `orchestrator (servicebus)` |
| 3   | Save Change     | `orchestrator (servicebus)` | `save-change (func)`        |
| 4   | Save Change     | `save-change (func)`        | `actions-db (cosmos)`       |
| 5   | Approve Save    | `actions-db (cosmos)`       | `notify-change (func)`      |
| 6   | Notify          | `notify-change (func)`      | `broadcaster (signalr)`     |
| 7   | Notify          | `broadcaster (signalr)`     | `reactjs`                   |


___
## Further reading

#### Architecture & Concepts:
- [Saga distributed transactions pattern](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/saga/saga)
- [Trace Context](https://www.w3.org/TR/trace-context/)


#### Azure

###### Concepts
- [Recommended abbreviations for Azure resource types](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-abbreviations)
- [Service Bus queues, topics, and subscriptions](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions)
- [Azure Functions JavaScript developer guide](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2)
- [CosmosDB How to choose between provisioned throughput and serverless](https://docs.microsoft.com/en-us/azure/cosmos-db/throughput-serverless)
- [Use Azure Functions to develop Node.js serverless code](https://docs.microsoft.com/en-us/azure/developer/javascript/how-to/develop-serverless-apps)

###### Bindings
- [Register Azure Functions binding extensions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-register?source=docs#access-extensions-in-non-net-languages)
- [Azure Cosmos DB output binding for Azure Functions 2.x and higher](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-output?tabs=javascript)
- [Azure Service Bus output binding for Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-service-bus-output?tabs=javascript)

###### Monitor
- [Log custom telemetry (operation_id)](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2#log-custom-telemetry)
- [How to run Azure Application Insights in developer mode for Javascript (node.js)](https://stackoverflow.com/questions/55183717/how-to-run-azure-application-insights-in-developer-mode-for-javascript-node-js)

#### Tooling & Misc
- [Visual Studio Code Project Runtime](https://github.com/Microsoft/vscode-azurefunctions/wiki/Project-Runtime)
- [Functions V4 - Require a minimum version for supported extensions](https://github.com/Azure/Azure-Functions/issues/1987)
- [stackoverflow: Cosmos DB Trigger binding not registered?](https://stackoverflow.com/questions/60239375/cosmos-db-trigger-binding-not-registered)