import * as awsx from "@pulumi/awsx";
import * as docker from "@pulumi/docker"
import {EcrRepository} from "./base/EcrRepository"
import {EcsCluster} from "./base/EcsCluster"


//create an ECR repository for my code
const repo = new EcrRepository("partstrader/spike/pulumi-ecs");

//construct a simple ECS Cluster
const myCluster = new EcsCluster("pulumi-ecs");

//let's create an alb
const listener = new awsx.lb.ApplicationListener("pulumi-ecs-primary", { 
    external: true,
    port: 80 
});


//create our ecs task (with docker build of container)
const taskDefinition = new awsx.ecs.FargateTaskDefinition("pulumi-ecs-primary", {
    containers: {
        sampleapp: {
            image: awsx.ecs.Image.fromDockerBuild(repo, {
                    context: "../src/",
                    dockerfile: "../src/MyApi/MyApi.Service/AWS.Dockerfile",
                   /* extraOptions: [
                        `-t ${ repo.repositoryUrl }/partstrader/spike/pulumi-ecs-primary:1.2.2.3`
                    ],*/
            }),
            portMappings: [listener],
            environment: [
                    {
                        name: "SOME_ENV_VARIABLE",
                        value: "This Value"
                    }
                ],

        },
    },
});


//Create our Fargate service
const fargateService = new awsx.ecs.FargateService("pulumi-ecs", 
    {
        cluster: myCluster,
        desiredCount: 1,
        //healthCheckGracePeriodSeconds: 10,
        taskDefinition: taskDefinition,
});
