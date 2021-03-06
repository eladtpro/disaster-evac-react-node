terraform fmt   # Fix template indentation
terraform init  # Initialize Terraform (one time)
terraform plan  # Plan the deployment
terraform apply -auto-approve   # Deploy
terraform show # show the curremt state of the resources terraform knows about

az login
terraform plan -var "rgName=rg-saga"
terraform apply -var "rgName=rg-saga" -auto-approve

# find extension "type handler version"
#az vm extension image list --location westus -o table