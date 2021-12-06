terraform fmt   # Fix template indentation
terraform init  # Initialize Terraform (one time)
terraform plan  # Plan the deployment
terraform apply -auto-approve   # Deploy
terraform show # show the curremt state of the resources terraform knows about
$remoteVnetRG = "*****" # to complete
$RemoteVnetID = "/subscriptions/******/resourceGroups/*******/providers/Microsoft.Network/virtualNetworks/***" # to complete
$RemoteVnetName = "****" # to complete
$sourceIpAddress = "*****" # to complete
$KVID = "****"
$userNameSecret = "DefaultAdminUsername" # to complete
$passwordSecret = "DefaultAdminPassword" # to complete
#terraform plan -var "userNameSecret=$userNameSecret" -var "passwordSecret=$passwordSecret" -var "kvId=$KVID" -var "RemoteVnetRG=$remoteVnetRG" -var "RemoteVnetID=$RemoteVnetID" -var "RemoteVnetName=$RemoteVnetName" -var "sourceIpAddress=$sourceIpAddress"
#terraform apply -var "userNameSecret=$userNameSecret" -var "passwordSecret=$passwordSecret" -var "kvId=$KVID" -var "RemoteVnetRG=$remoteVnetRG" -var "RemoteVnetID=$RemoteVnetID" -var "RemoteVnetName=$RemoteVnetName" -var "sourceIpAddress=$sourceIpAddress" -auto-approve
terraform plan
# find extension "type handler version"
az vm extension image list --location westus -o table