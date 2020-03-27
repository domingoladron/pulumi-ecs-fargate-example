#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["MyApi/MyApi.Service/MyApi.Service.csproj", "MyApi.Service/"]
RUN dotnet restore "MyApi.Service/MyApi.Service.csproj"
COPY . .
WORKDIR "/src/MyApi/MyApi.Service"
RUN dotnet build "MyApi.Service.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyApi.Service.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyApi.Service.dll"]