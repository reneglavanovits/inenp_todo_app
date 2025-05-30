
install kubernetes dashboard in docker-desktop:

`kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml`

create admin user
`kubectl apply -f dashboard-adminuser.yaml`

Get Service Account
`kubectl -n kubernetes-dashboard get sa/kubernetes-dashboard`

Get Token of Service Account:

`kubectl create token admin-user -n kubernetes-dashboard`