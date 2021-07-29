# Pulumi AWS ECS Fargate Example
An example of using Pulumi IaC and AWS to create an ECS Fargate cluster, service, and task.  Sexy!
From my Medium article

https://medium.com/it-dead-inside/deploy-aws-fargate-clusters-with-pulumi-e06637e6821d

## How to get started?
- Get yourself up and running with a free account from Pulumi => [Getting Started](https://www.pulumi.com/docs/get-started/)
- Make sure you have a free aws account to try this out => [Amazon Web Services](https://aws.amazon.com/)
- Install the aws tools are installed and configured for your OS.
- Make sure your pulumi cli is configured

## What to do?
- Pull the source of this repo
- Navigate to the infra directory
- run 'npm install'
- (optional) run 'pulumi config aws:region <aws-region>'
- (optional) run 'pulumi config aws:profile <profile>'
- run 'pulumi up'

Confirm to create your stack, and watch the magic!

Note:  You'll want to log into the AWS console to see what you've created


## How to wrap up?
- Navigate to the infra directory
- run 'pulumi destroy'

And confirm to destroy your stack

